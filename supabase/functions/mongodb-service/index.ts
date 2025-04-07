
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle OPTIONS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

// Get MongoDB connection string from environment variable
function getMongoUri() {
  const mongoUri = Deno.env.get("MONGODB_CONNECTION_STRING");
  if (!mongoUri) {
    throw new Error("MongoDB connection string not found in environment variables");
  }
  return mongoUri;
}

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Extract the request parameters
    const requestData = await req.json();
    const { collection, operation, filter = {}, data, options = {}, pipeline = [] } = requestData;
    
    console.log(`MongoDB operation requested: ${operation} on collection ${collection}`);
    
    // Validation
    if (!collection) {
      throw new Error("Collection name is required");
    }
    
    if (!operation) {
      throw new Error("Operation type is required");
    }

    // Connect to MongoDB
    const client = new MongoClient();
    await client.connect(getMongoUri());
    console.log("Connected to MongoDB");
    
    // Get the database - using 'battlemitra' as default database name
    // You can change this to your actual database name
    const db = client.database("battlemitra");
    
    // Get the specified collection
    const coll = db.collection(collection);
    
    let result;
    
    // Execute the requested operation
    switch (operation) {
      case "find":
        console.log(`Executing find with filter:`, filter, `and options:`, options);
        result = await coll.find(filter, options).toArray();
        break;
      
      case "findOne":
        console.log(`Executing findOne with filter:`, filter);
        result = await coll.findOne(filter);
        break;
      
      case "insertOne":
        console.log(`Executing insertOne with data:`, data);
        result = await coll.insertOne(data);
        break;
      
      case "updateOne":
        console.log(`Executing updateOne with filter:`, filter, `and data:`, data);
        result = await coll.updateOne(filter, { $set: data });
        break;
      
      case "deleteOne":
        console.log(`Executing deleteOne with filter:`, filter);
        result = await coll.deleteOne(filter);
        break;
      
      case "aggregate":
        console.log(`Executing aggregate with pipeline:`, pipeline);
        result = await coll.aggregate(pipeline).toArray();
        break;
      
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
    
    // Close the MongoDB connection
    await client.close();
    console.log("MongoDB connection closed");
    
    // Return the result with CORS headers
    return new Response(
      JSON.stringify(result),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error executing MongoDB operation:", error.message);
    
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
});
