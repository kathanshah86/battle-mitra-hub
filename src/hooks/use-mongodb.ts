
import { useState } from 'react';
import { mongoService, MongoDBOperationParams } from '@/services/mongoService';
import { toast } from '@/hooks/use-toast';

export const useMongoDB = () => {
  const [loading, setLoading] = useState(false);
  
  const executeOperation = async (params: MongoDBOperationParams) => {
    setLoading(true);
    try {
      const { data, error } = await mongoService.execute(params);
      
      if (error) {
        toast({
          title: 'Database Error',
          description: error,
          variant: 'destructive'
        });
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('MongoDB operation failed:', error);
      toast({
        title: 'Database Error',
        description: error instanceof Error ? error.message : 'Failed to perform database operation',
        variant: 'destructive'
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    find: (collection: string, filter = {}, options = {}) => 
      executeOperation({ collection, operation: 'find', filter, options }),
    
    findOne: (collection: string, filter = {}) => 
      executeOperation({ collection, operation: 'findOne', filter }),
    
    insertOne: (collection: string, data = {}) => 
      executeOperation({ collection, operation: 'insertOne', data }),
    
    updateOne: (collection: string, filter = {}, data = {}) => 
      executeOperation({ collection, operation: 'updateOne', filter, data }),
    
    deleteOne: (collection: string, filter = {}) => 
      executeOperation({ collection, operation: 'deleteOne', filter }),
    
    aggregate: (collection: string, pipeline = []) => 
      executeOperation({ collection, operation: 'aggregate', pipeline })
  };
};
