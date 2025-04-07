import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';
import { useMongoDB } from '@/hooks/use-mongodb';

interface AIRequestParams {
  prompt: string;
  gameType?: 'fps' | 'battle-royale' | 'moba' | 'sports' | 'card' | 'fighting';
}

interface EmailRequestParams {
  to: string;
  subject: string;
  templateName: 'tournament-invite' | 'match-reminder' | 'custom';
  templateData?: Record<string, any>;
}

interface PaymentRequestParams {
  amount: number; // Amount in cents
  currency: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, any>;
}

export const useBackendServices = () => {
  const [aiLoading, setAiLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const mongodb = useMongoDB();
  
  const getGameStrategy = async ({ prompt, gameType }: AIRequestParams) => {
    setAiLoading(true);
    setAiResponse(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { prompt, gameType },
      });
      
      if (error) throw new Error(error.message);
      
      setAiResponse(data.response);
      return data.response;
    } catch (error) {
      console.error('AI Chat error:', error);
      toast({
        title: 'AI Chat Error',
        description: error instanceof Error ? error.message : 'Failed to get game strategy',
        variant: 'destructive'
      });
      return null;
    } finally {
      setAiLoading(false);
    }
  };

  const sendEmail = async (params: EmailRequestParams) => {
    setEmailLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: params,
      });
      
      if (error) throw new Error(error.message);
      
      toast({
        title: 'Email Sent',
        description: 'The email has been sent successfully',
      });
      
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: 'Email Error',
        description: error instanceof Error ? error.message : 'Failed to send email',
        variant: 'destructive'
      });
      return false;
    } finally {
      setEmailLoading(false);
    }
  };

  const createPayment = async (params: PaymentRequestParams) => {
    setPaymentLoading(true);
    
    try {
      console.log('Creating payment with params:', params);
      
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: params,
      });
      
      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to create payment session');
      }
      
      if (!data || !data.url) {
        console.error('Invalid response from payment function:', data);
        throw new Error('Invalid payment session response');
      }
      
      console.log('Payment session created successfully:', data);
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
      
      return data;
    } catch (error) {
      console.error('Payment creation error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to create payment session',
        variant: 'destructive'
      });
      return null;
    } finally {
      setPaymentLoading(false);
    }
  };

  return {
    getGameStrategy,
    sendEmail,
    createPayment,
    aiLoading,
    emailLoading,
    paymentLoading,
    aiResponse,
    mongodb,
  };
};
