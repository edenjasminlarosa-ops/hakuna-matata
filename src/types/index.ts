export interface Wallet {
  id: string;
  user_id: string;
  available_balance: number;
  pending_balance: number;
  freezed_balance: number;
  currency: string;
  updated_at: string;
}

export interface DigitalAsset {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  category: 'source_code' | 'dataset' | 'b2b_specialty';
  price: number;
  license_type: string;
  file_url: string | null;
  status: 'pending_review' | 'approved' | 'rejected';
  posted_by_admin: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  product_name: string;
  subject: string;
  country: string;
  price: number;
  image_url_1: string;
  image_url_2: string;
  type: 'physical' | 'digital';
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
}

export interface JobPosting {
  id: string;
  buyer_id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
}

export interface JobBid {
  id: string;
  job_id: string;
  seller_id: string;
  bid_amount: number;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface EscrowTransaction {
  id: string;
  buyer_id: string;
  seller_id: string;
  reference_type: 'product' | 'asset' | 'job';
  reference_id: string;
  amount: number;
  commission: number;
  status: 'active' | 'completed' | 'disputed' | 'refunded';
  dispute_reason: string | null;
  admin_notes: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  lesson_number: number;
  title: string;
  content: string;
  video_url: string | null;
  created_at: string;
}

export interface Exam {
  id: string;
  course_id: string;
  exam_number: number;
  title: string;
  passing_score: number;
  created_at: string;
}
