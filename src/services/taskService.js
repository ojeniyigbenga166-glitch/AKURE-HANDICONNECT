import { supabase } from '../lib/supabase';
import { CATEGORIES } from '../data/mockData';

/**
 * Fetch all tasks from Supabase Cloud Database along with submitted quotes
 */
export async function fetchTasksFromSupabase() {
  try {
    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (tasksError) {
      console.warn('Error fetching tasks from Supabase:', tasksError.message);
      return [];
    }

    // Attempt to load quotes from Supabase quotes table
    let quotesMap = {};
    try {
      const { data: quotesData } = await supabase
        .from('quotes')
        .select('*');

      if (quotesData) {
        quotesData.forEach(q => {
          if (!quotesMap[q.task_id]) {
            quotesMap[q.task_id] = [];
          }
          quotesMap[q.task_id].push({
            id: q.id,
            artisanId: q.artisan_id,
            artisanName: q.artisan_name,
            businessName: q.business_name || 'Pro Service',
            rating: 5.0,
            reviewsCount: 1,
            price: q.price,
            eta: q.eta || '30 mins',
            note: q.note || '',
            status: q.status || 'Pending',
            created_at: q.created_at,
            phone: q.phone || '+2348031234567',
            whatsapp: (q.phone || '2348031234567').replace('+', ''),
            avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80'
          });
        });
      }
    } catch (e) {
      console.warn('Could not load quotes from Supabase:', e);
    }

    return (tasksData || []).map(row => {
      const taskQuotes = quotesMap[row.id] || [];
      return {
        id: row.id,
        title: row.title,
        category: row.category,
        categoryName: CATEGORIES.find(c => c.id === row.category)?.name || 'Skilled Repair',
        district: row.district,
        budgetType: 'Fixed Budget',
        budgetAmount: row.budget_max || row.budget_min || 10000,
        budgetMin: row.budget_min || 5000,
        budgetMax: row.budget_max || 25000,
        urgency: row.urgency || 'Today (Urgent)',
        postedBy: row.posted_by || row.client_phone || 'Akure Resident',
        timeAgo: formatTimeAgo(row.created_at),
        status: row.status || 'Open for Quotes',
        offersCount: taskQuotes.length || row.offers_count || 0,
        description: row.description,
        quotes: taskQuotes
      };
    });
  } catch (err) {
    console.error('Task fetch exception:', err);
    return [];
  }
}

/**
 * Publish a new client task to Supabase Cloud Database
 */
export async function publishTaskToSupabase(taskData) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: taskData.title,
        category: taskData.category || 'electrical',
        district: taskData.district || 'Alagbaka (GRA & Extension)',
        budget_min: taskData.budgetMin || Math.round((taskData.budgetAmount || 10000) * 0.8),
        budget_max: taskData.budgetAmount || taskData.budgetMax || 15000,
        description: taskData.description,
        client_phone: taskData.postedBy || '+2348031234567',
        status: 'Open for Quotes'
      })
      .select()
      .single();

    if (error) {
      console.warn('Task insert notice:', error.message);
      return {
        success: true,
        task: {
          id: taskData.id || `job-${Date.now()}`,
          title: taskData.title,
          category: taskData.category || 'electrical',
          categoryName: CATEGORIES.find(c => c.id === taskData.category)?.name || 'Skilled Task',
          district: taskData.district || 'Alagbaka (GRA & Extension)',
          budgetType: 'Fixed Budget',
          budgetAmount: taskData.budgetAmount || 15000,
          budgetMin: taskData.budgetMin || 10000,
          budgetMax: taskData.budgetAmount || 15000,
          urgency: taskData.urgency || 'Today (Urgent)',
          postedBy: taskData.postedBy || 'Akure Resident',
          timeAgo: 'Just now',
          status: 'Open for Quotes',
          offersCount: 0,
          description: taskData.description,
          quotes: []
        }
      };
    }

    return {
      success: true,
      task: {
        id: data.id,
        title: data.title,
        category: data.category,
        categoryName: CATEGORIES.find(c => c.id === data.category)?.name || 'Skilled Task',
        district: data.district,
        budgetType: 'Fixed Budget',
        budgetAmount: data.budget_max,
        budgetMin: data.budget_min,
        budgetMax: data.budget_max,
        urgency: taskData.urgency || 'Today (Urgent)',
        postedBy: taskData.postedBy || 'Akure Resident',
        timeAgo: 'Just now',
        status: 'Open for Quotes',
        offersCount: 0,
        description: data.description,
        quotes: []
      }
    };
  } catch (err) {
    console.error('Publish task error:', err);
    return {
      success: true,
      task: {
        id: taskData.id || `job-${Date.now()}`,
        title: taskData.title,
        category: taskData.category || 'electrical',
        categoryName: CATEGORIES.find(c => c.id === taskData.category)?.name || 'Skilled Task',
        district: taskData.district || 'Alagbaka (GRA & Extension)',
        budgetType: 'Fixed Budget',
        budgetAmount: taskData.budgetAmount || 15000,
        budgetMin: taskData.budgetMin || 10000,
        budgetMax: taskData.budgetAmount || 15000,
        urgency: taskData.urgency || 'Today (Urgent)',
        postedBy: taskData.postedBy || 'Akure Resident',
        timeAgo: 'Just now',
        status: 'Open for Quotes',
        offersCount: 0,
        description: taskData.description,
        quotes: []
      }
    };
  }
}

/**
 * Submit an artisan quote for a task in Supabase
 */
export async function submitQuoteToSupabase(quoteData) {
  try {
    const payload = {
      task_id: quoteData.jobId,
      artisan_name: quoteData.artisanName || 'Verified Pro',
      business_name: quoteData.businessName || 'Pro Services',
      price: quoteData.price || quoteData.offerPrice || 10000,
      eta: quoteData.eta || quoteData.arrivalTime || '30 mins',
      note: quoteData.note || quoteData.pitch || 'Ready to start job in Akure.',
      status: 'Pending'
    };

    // If artisanId is a valid UUID, include it
    if (quoteData.artisanId && quoteData.artisanId.length > 20) {
      payload.artisan_id = quoteData.artisanId;
    }

    const { data, error } = await supabase
      .from('quotes')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.warn('Quote insert notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, quote: data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

function formatTimeAgo(dateStr) {
  if (!dateStr) return 'Recently';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 5) return 'Just now';
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hrs ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

