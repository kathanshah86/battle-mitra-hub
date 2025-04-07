
import { supabase } from "@/integrations/supabase/client";

export interface MongoDBOperationParams {
  collection: string;
  operation: 'find' | 'findOne' | 'insertOne' | 'updateOne' | 'deleteOne' | 'aggregate';
  filter?: Record<string, any>;
  data?: Record<string, any>;
  options?: Record<string, any>;
  pipeline?: Array<Record<string, any>>;
}

export const mongoService = {
  async execute(params: MongoDBOperationParams) {
    try {
      const { data, error } = await supabase.functions.invoke('mongodb-service', {
        body: params,
      });
      
      if (error) throw new Error(error.message);
      
      return { data, error: null };
    } catch (error) {
      console.error('MongoDB operation error:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to execute MongoDB operation' 
      };
    }
  },
  
  async find(collection: string, filter = {}, options = {}) {
    return this.execute({
      collection,
      operation: 'find',
      filter,
      options
    });
  },
  
  async findOne(collection: string, filter = {}) {
    return this.execute({
      collection,
      operation: 'findOne',
      filter
    });
  },
  
  async insertOne(collection: string, data = {}) {
    return this.execute({
      collection,
      operation: 'insertOne',
      data
    });
  },
  
  async updateOne(collection: string, filter = {}, data = {}) {
    return this.execute({
      collection,
      operation: 'updateOne',
      filter,
      data
    });
  },
  
  async deleteOne(collection: string, filter = {}) {
    return this.execute({
      collection,
      operation: 'deleteOne',
      filter
    });
  },
  
  async aggregate(collection: string, pipeline = []) {
    return this.execute({
      collection,
      operation: 'aggregate',
      pipeline
    });
  }
};
