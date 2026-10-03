import { supabase } from '../lib/supabase';
import { INITIAL_ARTISANS } from '../data/mockData';

/**
 * Fetch all verified artisans from Supabase Database
 */
export async function fetchArtisansFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('artisans')
      .select('*')
      .order('rating', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('[Supabase] Falling back to initial mock data:', error?.message);
      return INITIAL_ARTISANS;
    }

    // Transform Supabase rows to app format
    return data.map(artisan => ({
      id: artisan.id,
      name: artisan.name,
      businessName: artisan.business_name || artisan.name,
      category: artisan.category,
      categoryName: artisan.category_name,
      rating: Number(artisan.rating) || 5.0,
      reviewsCount: artisan.reviews_count || 0,
      completedJobs: artisan.completed_jobs || 0,
      badge: artisan.badge || 'Verified Pro',
      isVerified: Boolean(artisan.is_verified),
      experienceYears: artisan.experience_years || 5,
      startingRate: artisan.starting_rate || 5000,
      phone: artisan.phone,
      whatsapp: artisan.whatsapp || artisan.phone?.replace('+', ''),
      districts: typeof artisan.districts === 'string' ? JSON.parse(artisan.districts) : (artisan.districts || []),
      avatar: artisan.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
      bio: artisan.bio,
      responseTime: artisan.response_time || '< 15 minutes',
      portfolio: [
        { title: 'Completed Project Sample 1', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Completed Project Sample 2', image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80' }
      ],
      reviews: [
        { id: 'r1', name: 'Dr. Femi Ogundele', district: 'Alagbaka', rating: 5, date: '3 days ago', comment: 'Prompt response in Alagbaka. Fixed distribution box safely and neatly.' }
      ]
    }));
  } catch (err) {
    console.error('[Supabase Exception]:', err);
    return INITIAL_ARTISANS;
  }
}

/**
 * Fetch a single artisan by ID from Supabase
 */
export async function fetchArtisanByIdFromSupabase(id) {
  try {
    const { data, error } = await supabase
      .from('artisans')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      businessName: data.business_name || data.name,
      category: data.category,
      categoryName: data.category_name,
      rating: Number(data.rating) || 5.0,
      reviewsCount: data.reviews_count || 0,
      completedJobs: data.completed_jobs || 0,
      badge: data.badge || 'Verified Pro',
      isVerified: Boolean(data.is_verified),
      experienceYears: data.experience_years || 5,
      startingRate: data.starting_rate || 5000,
      phone: data.phone,
      whatsapp: data.whatsapp || data.phone?.replace('+', ''),
      districts: typeof data.districts === 'string' ? JSON.parse(data.districts) : (data.districts || []),
      avatar: data.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
      bio: data.bio,
      responseTime: data.response_time || '< 15 minutes',
      portfolio: [
        { title: 'Completed Project Sample 1', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
        { title: 'Completed Project Sample 2', image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80' }
      ],
      reviews: [
        { id: 'r1', name: 'Dr. Femi Ogundele', district: 'Alagbaka', rating: 5, date: '3 days ago', comment: 'Prompt response in Alagbaka. Fixed distribution box safely and neatly.' }
      ]
    };
  } catch (err) {
    console.error('[Supabase Exception]:', err);
    return null;
  }
}
