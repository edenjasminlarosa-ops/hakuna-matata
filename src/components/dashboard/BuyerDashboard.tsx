// import { useState, useEffect } from 'react';
// import { ShoppingBag, Briefcase, BookOpen, Package, Plus } from 'lucide-react';
// import { supabase } from '../../lib/supabase';
// import { useAuth } from '../../contexts/AuthContext';
// import { DigitalAsset, Product, JobPosting, Course, EscrowTransaction } from '../../types';

// export const BuyerDashboard = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState<'browse' | 'purchases' | 'jobs'>('browse');
//   const [assets, setAssets] = useState<DigitalAsset[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [myPurchases, setMyPurchases] = useState<EscrowTransaction[]>([]);
//   const [myJobs, setMyJobs] = useState<JobPosting[]>([]);
//   const [showJobForm, setShowJobForm] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, [activeTab]);

//   const loadData = async () => {
//     if (activeTab === 'browse') {
//       const { data: assetsData } = await supabase
//         .from('digital_assets')
//         .select('*')
//         .eq('status', 'approved')
//         .order('created_at', { ascending: false });
//       setAssets(assetsData || []);

//       const { data: productsData } = await supabase
//         .from('products')
//         .select('*')
//         .eq('status', 'active')
//         .order('created_at', { ascending: false });
//       setProducts(productsData || []);
//     } else if (activeTab === 'purchases') {
//       const { data } = await supabase
//         .from('escrow_transactions')
//         .select('*')
//         .eq('buyer_id', user?.id)
//         .order('created_at', { ascending: false });
//       setMyPurchases(data || []);
//     } else if (activeTab === 'jobs') {
//       const { data } = await supabase
//         .from('job_postings')
//         .select('*')
//         .eq('buyer_id', user?.id)
//         .order('created_at', { ascending: false });
//       setMyJobs(data || []);
//     }
//   };

//   const handleBuyAsset = async (asset: DigitalAsset) => {
//     const commission = asset.price * 0.10;

//     const { error } = await supabase
//       .from('escrow_transactions')
//       .insert({
//         buyer_id: user?.id,
//         seller_id: asset.seller_id,
//         reference_type: 'asset',
//         reference_id: asset.id,
//         amount: asset.price,
//         commission: commission,
//         status: 'active',
//       });

//     if (!error) {
//       alert('Purchase initiated! Transaction is now in escrow.');
//       loadData();
//     } else {
//       alert('Failed to initiate purchase');
//     }
//   };

//   const handleBuyProduct = async (product: Product) => {
//     const commission = product.price * 0.10;

//     const { error } = await supabase
//       .from('escrow_transactions')
//       .insert({
//         buyer_id: user?.id,
//         seller_id: product.seller_id,
//         reference_type: 'product',
//         reference_id: product.id,
//         amount: product.price,
//         commission: commission,
//         status: 'active',
//       });

//     if (!error) {
//       alert('Purchase initiated! Transaction is now in escrow.');
//       loadData();
//     } else {
//       alert('Failed to initiate purchase');
//     }
//   };

//   const [jobTitle, setJobTitle] = useState('');
//   const [jobDescription, setJobDescription] = useState('');
//   const [jobBudget, setJobBudget] = useState('');
//   const [jobCategory, setJobCategory] = useState('');

//   const handlePostJob = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error } = await supabase
//       .from('job_postings')
//       .insert({
//         buyer_id: user?.id,
//         title: jobTitle,
//         description: jobDescription,
//         budget: parseFloat(jobBudget),
//         category: jobCategory,
//         status: 'open',
//       });

//     if (!error) {
//       alert('Job posted successfully!');
//       setShowJobForm(false);
//       setJobTitle('');
//       setJobDescription('');
//       setJobBudget('');
//       setJobCategory('');
//       loadData();
//     } else {
//       alert('Failed to post job');
//     }
//   };

//   return (
//     <div>
//       <div className="flex space-x-4 mb-8">
//         <button
//           onClick={() => setActiveTab('browse')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'browse'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Browse Marketplace
//         </button>
//         <button
//           onClick={() => setActiveTab('purchases')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'purchases'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           My Purchases
//         </button>
//         <button
//           onClick={() => setActiveTab('jobs')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'jobs'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           My Job Postings
//         </button>
//       </div>

//       {activeTab === 'browse' && (
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Digital Assets</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {assets.map((asset) => (
//               <div key={asset.id} className="bg-white rounded-lg shadow p-6">
//                 <h3 className="font-bold text-lg text-gray-900 mb-2">{asset.title}</h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-3">{asset.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-2xl font-bold text-gray-900">${asset.price}</span>
//                   <button
//                     onClick={() => handleBuyAsset(asset)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <h2 className="text-xl font-bold text-gray-900 mb-4">Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
//                 <img
//                   src={product.image_url_1}
//                   alt={product.product_name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="font-bold text-lg text-gray-900 mb-2">{product.product_name}</h3>
//                   <p className="text-gray-600 text-sm mb-2">{product.subject}</p>
//                   <p className="text-gray-500 text-xs mb-4">{product.country}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-2xl font-bold text-gray-900">${product.price}</span>
//                     <button
//                       onClick={() => handleBuyProduct(product)}
//                       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === 'purchases' && (
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">My Purchases</h2>
//           <div className="space-y-4">
//             {myPurchases.map((purchase) => (
//               <div key={purchase.id} className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-bold text-gray-900">Transaction ID: {purchase.id}</p>
//                     <p className="text-sm text-gray-600">Amount: ${purchase.amount}</p>
//                     <p className="text-sm text-gray-600">Commission: ${purchase.commission}</p>
//                     <p className="text-sm text-gray-600">Type: {purchase.reference_type}</p>
//                   </div>
//                   <div>
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       purchase.status === 'completed' ? 'bg-green-100 text-green-800' :
//                       purchase.status === 'active' ? 'bg-blue-100 text-blue-800' :
//                       purchase.status === 'disputed' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {purchase.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {myPurchases.length === 0 && (
//               <div className="text-center py-12 text-gray-500">No purchases yet</div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === 'jobs' && (
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">My Job Postings</h2>
//             <button
//               onClick={() => setShowJobForm(!showJobForm)}
//               className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               <Plus size={20} />
//               <span>Post New Job</span>
//             </button>
//           </div>

//           {showJobForm && (
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Post a New Job</h3>
//               <form onSubmit={handlePostJob} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={jobTitle}
//                     onChange={(e) => setJobTitle(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     value={jobDescription}
//                     onChange={(e) => setJobDescription(e.target.value)}
//                     required
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                   <input
//                     type="text"
//                     value={jobCategory}
//                     onChange={(e) => setJobCategory(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
//                   <input
//                     type="number"
//                     value={jobBudget}
//                     onChange={(e) => setJobBudget(e.target.value)}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Post Job
//                 </button>
//               </form>
//             </div>
//           )}

//           <div className="space-y-4">
//             {myJobs.map((job) => (
//               <div key={job.id} className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h3 className="font-bold text-lg text-gray-900 mb-2">{job.title}</h3>
//                     <p className="text-gray-600 text-sm mb-4">{job.description}</p>
//                     <p className="text-gray-700 font-medium">Budget: ${job.budget}</p>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     job.status === 'open' ? 'bg-green-100 text-green-800' :
//                     job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
//                     job.status === 'completed' ? 'bg-gray-100 text-gray-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {job.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             {myJobs.length === 0 && (
//               <div className="text-center py-12 text-gray-500">No job postings yet</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



import { useState, useEffect } from 'react';
import { ShoppingBag, Briefcase, BookOpen, Package, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { DigitalAsset, Product, JobPosting, EscrowTransaction } from '../../types';
import './BuyerDashboard.css'; // Import the CSS file

export const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'purchases' | 'jobs'>('browse');
  const [assets, setAssets] = useState<DigitalAsset[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [myPurchases, setMyPurchases] = useState<EscrowTransaction[]>([]);
  const [myJobs, setMyJobs] = useState<JobPosting[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    if (activeTab === 'browse') {
      const { data: assetsData } = await supabase
        .from('digital_assets')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      setAssets(assetsData || []);

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      setProducts(productsData || []);
    } else if (activeTab === 'purchases') {
      const { data } = await supabase
        .from('escrow_transactions')
        .select('*')
        .eq('buyer_id', user?.id)
        .order('created_at', { ascending: false });
      setMyPurchases(data || []);
    } else if (activeTab === 'jobs') {
      const { data } = await supabase
        .from('job_postings')
        .select('*')
        .eq('buyer_id', user?.id)
        .order('created_at', { ascending: false });
      setMyJobs(data || []);
    }
  };

  const handleBuyAsset = async (asset: DigitalAsset) => {
    const commission = asset.price * 0.10;

    const { error } = await supabase
      .from('escrow_transactions')
      .insert({
        buyer_id: user?.id,
        seller_id: asset.seller_id,
        reference_type: 'asset',
        reference_id: asset.id,
        amount: asset.price,
        commission: commission,
        status: 'active',
      });

    if (!error) {
      alert('Purchase initiated! Transaction is now in escrow.');
      loadData();
    } else {
      alert('Failed to initiate purchase');
    }
  };

  const handleBuyProduct = async (product: Product) => {
    const commission = product.price * 0.10;

    const { error } = await supabase
      .from('escrow_transactions')
      .insert({
        buyer_id: user?.id,
        seller_id: product.seller_id,
        reference_type: 'product',
        reference_id: product.id,
        amount: product.price,
        commission: commission,
        status: 'active',
      });

    if (!error) {
      alert('Purchase initiated! Transaction is now in escrow.');
      loadData();
    } else {
      alert('Failed to initiate purchase');
    }
  };

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobBudget, setJobBudget] = useState('');
  const [jobCategory, setJobCategory] = useState('');

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('job_postings')
      .insert({
        buyer_id: user?.id,
        title: jobTitle,
        description: jobDescription,
        budget: parseFloat(jobBudget),
        category: jobCategory,
        status: 'open',
      });

    if (!error) {
      alert('Job posted successfully!');
      setShowJobForm(false);
      setJobTitle('');
      setJobDescription('');
      setJobBudget('');
      setJobCategory('');
      loadData();
    } else {
      alert('Failed to post job');
    }
  };

  return (
    <div className="buyer-dashboard-container">
      <header className="buyer-dashboard-header">
        <div className="header-content" />
      </header>

      <div className="tabs">
        <button
          onClick={() => setActiveTab('browse')}
          className={`tab-button ${activeTab === 'browse' ? 'active' : ''}`}
        >
          <Package size={20} />
          <span>Browse Marketplace</span>
        </button>
        <button
          onClick={() => setActiveTab('purchases')}
          className={`tab-button ${activeTab === 'purchases' ? 'active' : ''}`}
        >
          <ShoppingBag size={20} />
          <span>My Purchases</span>
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
        >
          <Briefcase size={20} />
          <span>My Job Postings</span>
        </button>
      </div>

      <div className="content">
        {activeTab === 'browse' && (
          <div>
            <h2 className="section-title">Digital Assets</h2>
            <div className="grid">
              {assets.map((asset, index) => (
                <div key={asset.id} className="card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3>{asset.title}</h3>
                  <p>{asset.description}</p>
                  <div className="card-footer">
                    <span>${asset.price}</span>
                    <button onClick={() => handleBuyAsset(asset)}>Buy Now</button>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="section-title">Products</h2>
            <div className="grid">
              {products.map((product, index) => (
                <div key={product.id} className="card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <img src={product.image_url_1} alt={product.product_name} className="card-image" />
                  <h3>{product.product_name}</h3>
                  <p>{product.subject}</p>
                  <p>{product.country}</p>
                  <div className="card-footer">
                    <span>${product.price}</span>
                    <button onClick={() => handleBuyProduct(product)}>Buy Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div>
            <h2 className="section-title">My Purchases</h2>
            <div className="purchase-list">
              {myPurchases.map((purchase, index) => (
                <div key={purchase.id} className="purchase-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div>
                    <p>Transaction ID: {purchase.id}</p>
                    <p>Amount: ${purchase.amount}</p>
                    <p>Commission: ${purchase.commission}</p>
                    <p>Type: {purchase.reference_type}</p>
                  </div>
                  <span className={purchase.status.toLowerCase()}>
                    {purchase.status}
                  </span>
                </div>
              ))}
              {myPurchases.length === 0 && <p className="no-items">No purchases yet</p>}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <div className="job-header">
              <h2 className="section-title">My Job Postings</h2>
              <button onClick={() => setShowJobForm(!showJobForm)} className="post-job-button">
                <Plus size={20} />
                <span>Post New Job</span>
              </button>
            </div>

            {showJobForm && (
              <div className="job-form">
                <h3 className="form-title">Post a New Job</h3>
                <form onSubmit={handlePostJob} className="job-form-content">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      required
                      rows={4}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Budget ($)</label>
                    <input
                      type="number"
                      value={jobBudget}
                      onChange={(e) => setJobBudget(e.target.value)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <button type="submit">Post Job</button>
                </form>
              </div>
            )}

            <div className="job-list">
              {myJobs.map((job, index) => (
                <div key={job.id} className="job-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>Budget: ${job.budget}</p>
                  </div>
                  <span className={job.status.toLowerCase()}>
                    {job.status}
                  </span>
                </div>
              ))}
              {myJobs.length === 0 && <p className="no-items">No job postings yet</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};