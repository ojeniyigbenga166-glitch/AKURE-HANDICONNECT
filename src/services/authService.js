import { supabase } from '../lib/supabase';

/**
 * Sign In with Email & Password via Supabase Auth
 */
export async function signInWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const user = data.user;
    if (!user) {
      return { success: false, error: 'User authenticated but no data returned.' };
    }

    // Attempt to fetch profile record from public.profiles
    let profile = null;
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileData) {
      profile = profileData;
    }

    const role = profile?.role || user.user_metadata?.role || 'client';
    const name = profile?.full_name || user.user_metadata?.full_name || user.email.split('@')[0];
    const phone = profile?.phone || user.user_metadata?.phone || '+2348031234567';
    const district = profile?.district || user.user_metadata?.district || 'Alagbaka (GRA & Extension)';

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name,
        role,
        phone,
        district,
        businessName: user.user_metadata?.business_name || name
      },
      role
    };
  } catch (err) {
    return { success: false, error: err.message || 'An unexpected authentication error occurred.' };
  }
}

/**
 * Sign Up Client User via Supabase Auth & Store Profile in DB
 */
export async function signUpClientUser(email, password, fullName, phone, district) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          role: 'client',
          district
        }
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const authUser = data.user;
    if (!authUser) {
      return { success: false, error: 'Registration initiated. Please check your email to confirm.' };
    }

    // Insert or Upsert into public.profiles
    try {
      await supabase.from('profiles').upsert({
        id: authUser.id,
        full_name: fullName,
        phone: phone || '+2348031234567',
        role: 'client',
        district: district || 'Alagbaka (GRA & Extension)',
        updated_at: new Date().toISOString()
      });
    } catch (dbErr) {
      console.warn('Profile sync notice:', dbErr);
    }

    return {
      success: true,
      user: {
        id: authUser.id,
        email,
        name: fullName,
        role: 'client',
        phone,
        district
      },
      role: 'client'
    };
  } catch (err) {
    return { success: false, error: err.message || 'Client account registration failed.' };
  }
}

/**
 * Get Current Active Session from Supabase Auth
 */
export async function getCurrentSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) return null;

    const user = session.user;
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    const role = profile?.role || user.user_metadata?.role || 'client';
    const name = profile?.full_name || user.user_metadata?.full_name || user.email.split('@')[0];
    const phone = profile?.phone || user.user_metadata?.phone || '+2348031234567';
    const district = profile?.district || user.user_metadata?.district || 'Alagbaka (GRA & Extension)';

    return {
      id: user.id,
      email: user.email,
      name,
      role,
      phone,
      district,
      businessName: user.user_metadata?.business_name || name
    };
  } catch (err) {
    console.error('Session retrieval error:', err);
    return null;
  }
}

/**
 * Sign Out User from Supabase Auth
 */
export async function signOutUser() {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
