
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useSupabaseInit() {
  const { toast } = useToast();
  const [initialized, setInitialized] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const checkDatabaseExistence = async () => {
      try {
        // Try to query the profiles table to check if it exists
        const { error } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);

        if (error?.code !== '42P01') { // 42P01 is PostgreSQL's error code for "table does not exist"
          setInitialized(true);
        } else {
          console.log('Database tables do not exist yet.');
          
          toast({
            title: "Database Setup Required",
            description: "The required database tables haven't been created yet. Please run the SQL setup script.",
            duration: 8000,
          });
        }
      } catch (err) {
        console.error('Error checking database existence:', err);
        
        toast({
          title: "Database Connection Error",
          description: "Could not connect to the database. Please check your connection.",
          variant: "destructive",
          duration: 8000,
        });
      } finally {
        setInitializing(false);
      }
    };

    checkDatabaseExistence();
  }, [toast]);

  return { initialized, initializing };
}
