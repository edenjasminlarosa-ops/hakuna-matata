// import { useState, useEffect } from 'react';
// import { Plus, Upload } from 'lucide-react';
// import { supabase } from '../../lib/supabase';
// import { useAuth } from '../../contexts/AuthContext';
// import { DigitalAsset, Product, JobPosting, EscrowTransaction } from '../../types';

// export const SellerDashboard = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState<'assets' | 'products' | 'jobs' | 'sales'>('assets');
//   const [myAssets, setMyAssets] = useState<DigitalAsset[]>([]);
//   const [myProducts, setMyProducts] = useState<Product[]>([]);
//   const [availableJobs, setAvailableJobs] = useState<JobPosting[]>([]);
//   const [mySales, setMySales] = useState<EscrowTransaction[]>([]);
//   const [showAssetForm, setShowAssetForm] = useState(false);
//   const [showProductForm, setShowProductForm] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, [activeTab]);

//   const loadData = async () => {
//     if (activeTab === 'assets') {
//       const { data } = await supabase
//         .from('digital_assets')
//         .select('*')
//         .eq('seller_id', user?.id)
//         .order('created_at', { ascending: false });
//       setMyAssets(data || []);
//     } else if (activeTab === 'products') {
//       const { data } = await supabase
//         .from('products')
//         .select('*')
//         .eq('seller_id', user?.id)
//         .order('created_at', { ascending: false });
//       setMyProducts(data || []);
//     } else if (activeTab === 'jobs') {
//       const { data } = await supabase
//         .from('job_postings')
//         .select('*')
//         .eq('status', 'open')
//         .order('created_at', { ascending: false });
//       setAvailableJobs(data || []);
//     } else if (activeTab === 'sales') {
//       const { data } = await supabase
//         .from('escrow_transactions')
//         .select('*')
//         .eq('seller_id', user?.id)
//         .order('created_at', { ascending: false });
//       setMySales(data || []);
//     }
//   };

//   const [assetTitle, setAssetTitle] = useState('');
//   const [assetDescription, setAssetDescription] = useState('');
//   const [assetCategory, setAssetCategory] = useState('source_code');
//   const [assetPrice, setAssetPrice] = useState('');
//   const [assetLicense, setAssetLicense] = useState('');
//   const [assetFile, setAssetFile] = useState('');

//   const handleUploadAsset = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error } = await supabase
//       .from('digital_assets')
//       .insert({
//         seller_id: user?.id,
//         title: assetTitle,
//         description: assetDescription,
//         category: assetCategory,
//         price: parseFloat(assetPrice),
//         license_type: assetLicense,
//         file_url: assetFile,
//         status: 'pending_review',
//       });

//     if (!error) {
//       alert('Asset uploaded successfully! Pending admin review.');
//       setShowAssetForm(false);
//       setAssetTitle('');
//       setAssetDescription('');
//       setAssetPrice('');
//       setAssetLicense('');
//       setAssetFile('');
//       loadData();
//     } else {
//       alert('Failed to upload asset');
//     }
//   };

//   const [productName, setProductName] = useState('');
//   const [productSubject, setProductSubject] = useState('');
//   const [productCountry, setProductCountry] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productImage1, setProductImage1] = useState('');
//   const [productImage2, setProductImage2] = useState('');
//   const [productType, setProductType] = useState('physical');

//   const handlePostProduct = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const { error } = await supabase
//       .from('products')
//       .insert({
//         seller_id: user?.id,
//         product_name: productName,
//         subject: productSubject,
//         country: productCountry,
//         price: parseFloat(productPrice),
//         image_url_1: productImage1,
//         image_url_2: productImage2,
//         type: productType,
//         status: 'active',
//       });

//     if (!error) {
//       alert('Product posted successfully!');
//       setShowProductForm(false);
//       setProductName('');
//       setProductSubject('');
//       setProductCountry('');
//       setProductPrice('');
//       setProductImage1('');
//       setProductImage2('');
//       loadData();
//     } else {
//       alert('Failed to post product');
//     }
//   };

//   const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
//   const [bidAmount, setBidAmount] = useState('');
//   const [bidProposal, setBidProposal] = useState('');

//   const handleSubmitBid = async (jobId: string) => {
//     const { error } = await supabase
//       .from('job_bids')
//       .insert({
//         job_id: jobId,
//         seller_id: user?.id,
//         bid_amount: parseFloat(bidAmount),
//         proposal: bidProposal,
//         status: 'pending',
//       });

//     if (!error) {
//       alert('Bid submitted successfully!');
//       setSelectedJobId(null);
//       setBidAmount('');
//       setBidProposal('');
//     } else {
//       alert('Failed to submit bid');
//     }
//   };

//   return (
//     <div>
//       <div className="flex space-x-4 mb-8">
//         <button
//           onClick={() => setActiveTab('assets')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'assets'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           My Digital Assets
//         </button>
//         <button
//           onClick={() => setActiveTab('products')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'products'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           My Products
//         </button>
//         <button
//           onClick={() => setActiveTab('jobs')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'jobs'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           Available Jobs
//         </button>
//         <button
//           onClick={() => setActiveTab('sales')}
//           className={`px-6 py-3 rounded-lg transition ${
//             activeTab === 'sales'
//               ? 'bg-blue-600 text-white'
//               : 'bg-white text-gray-700 hover:bg-gray-100'
//           }`}
//         >
//           My Sales
//         </button>
//       </div>

//       {activeTab === 'assets' && (
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">My Digital Assets</h2>
//             <button
//               onClick={() => setShowAssetForm(!showAssetForm)}
//               className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               <Upload size={20} />
//               <span>Upload Asset</span>
//             </button>
//           </div>

//           {showAssetForm && (
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Digital Asset</h3>
//               <form onSubmit={handleUploadAsset} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     value={assetTitle}
//                     onChange={(e) => setAssetTitle(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     value={assetDescription}
//                     onChange={(e) => setAssetDescription(e.target.value)}
//                     required
//                     rows={4}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                   <select
//                     value={assetCategory}
//                     onChange={(e) => setAssetCategory(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="source_code">Source Code</option>
//                     <option value="dataset">Data Set</option>
//                     <option value="b2b_specialty">B2B Specialty</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
//                   <input
//                     type="number"
//                     value={assetPrice}
//                     onChange={(e) => setAssetPrice(e.target.value)}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
//                   <input
//                     type="text"
//                     value={assetLicense}
//                     onChange={(e) => setAssetLicense(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     placeholder="e.g., MIT, Commercial, etc."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
//                   <input
//                     type="url"
//                     value={assetFile}
//                     onChange={(e) => setAssetFile(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     placeholder="https://example.com/file.zip"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Upload Asset
//                 </button>
//               </form>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {myAssets.map((asset) => (
//               <div key={asset.id} className="bg-white rounded-lg shadow p-6">
//                 <h3 className="font-bold text-lg text-gray-900 mb-2">{asset.title}</h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-3">{asset.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xl font-bold text-gray-900">${asset.price}</span>
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     asset.status === 'approved' ? 'bg-green-100 text-green-800' :
//                     asset.status === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {asset.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//             {myAssets.length === 0 && (
//               <div className="col-span-3 text-center py-12 text-gray-500">No assets uploaded yet</div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === 'products' && (
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">My Products</h2>
//             <button
//               onClick={() => setShowProductForm(!showProductForm)}
//               className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               <Plus size={20} />
//               <span>Add Product</span>
//             </button>
//           </div>

//           {showProductForm && (
//             <div className="bg-white rounded-lg shadow p-6 mb-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Product</h3>
//               <form onSubmit={handlePostProduct} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                   <input
//                     type="text"
//                     value={productName}
//                     onChange={(e) => setProductName(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//                   <input
//                     type="text"
//                     value={productSubject}
//                     onChange={(e) => setProductSubject(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                   <input
//                     type="text"
//                     value={productCountry}
//                     onChange={(e) => setProductCountry(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
//                   <input
//                     type="number"
//                     value={productPrice}
//                     onChange={(e) => setProductPrice(e.target.value)}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                   <select
//                     value={productType}
//                     onChange={(e) => setProductType(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="physical">Physical</option>
//                     <option value="digital">Digital</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Image 1 URL</label>
//                   <input
//                     type="url"
//                     value={productImage1}
//                     onChange={(e) => setProductImage1(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     placeholder="https://example.com/image1.jpg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Image 2 URL</label>
//                   <input
//                     type="url"
//                     value={productImage2}
//                     onChange={(e) => setProductImage2(e.target.value)}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     placeholder="https://example.com/image2.jpg"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Post Product
//                 </button>
//               </form>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {myProducts.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
//                 <img
//                   src={product.image_url_1}
//                   alt={product.product_name}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="font-bold text-lg text-gray-900 mb-2">{product.product_name}</h3>
//                   <p className="text-gray-600 text-sm mb-2">{product.subject}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-bold text-gray-900">${product.price}</span>
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       product.status === 'active' ? 'bg-green-100 text-green-800' :
//                       product.status === 'sold' ? 'bg-blue-100 text-blue-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {product.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {myProducts.length === 0 && (
//               <div className="col-span-3 text-center py-12 text-gray-500">No products posted yet</div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === 'jobs' && (
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Available Jobs</h2>
//           <div className="space-y-4">
//             {availableJobs.map((job) => (
//               <div key={job.id} className="bg-white rounded-lg shadow p-6">
//                 <h3 className="font-bold text-lg text-gray-900 mb-2">{job.title}</h3>
//                 <p className="text-gray-600 text-sm mb-4">{job.description}</p>
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-xl font-bold text-gray-900">Budget: ${job.budget}</span>
//                   <button
//                     onClick={() => setSelectedJobId(job.id)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Place Bid
//                   </button>
//                 </div>

//                 {selectedJobId === job.id && (
//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <h4 className="font-bold text-gray-900 mb-2">Submit Your Bid</h4>
//                     <div className="space-y-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount ($)</label>
//                         <input
//                           type="number"
//                           value={bidAmount}
//                           onChange={(e) => setBidAmount(e.target.value)}
//                           required
//                           min="0"
//                           step="0.01"
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Proposal</label>
//                         <textarea
//                           value={bidProposal}
//                           onChange={(e) => setBidProposal(e.target.value)}
//                           required
//                           rows={3}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <button
//                         onClick={() => handleSubmitBid(job.id)}
//                         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                       >
//                         Submit Bid
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {availableJobs.length === 0 && (
//               <div className="text-center py-12 text-gray-500">No jobs available</div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === 'sales' && (
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">My Sales</h2>
//           <div className="space-y-4">
//             {mySales.map((sale) => (
//               <div key={sale.id} className="bg-white rounded-lg shadow p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-bold text-gray-900">Transaction ID: {sale.id}</p>
//                     <p className="text-sm text-gray-600">Amount: ${sale.amount}</p>
//                     <p className="text-sm text-gray-600">Commission: ${sale.commission}</p>
//                     <p className="text-sm text-gray-600">Type: {sale.reference_type}</p>
//                   </div>
//                   <div>
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       sale.status === 'completed' ? 'bg-green-100 text-green-800' :
//                       sale.status === 'active' ? 'bg-blue-100 text-blue-800' :
//                       sale.status === 'disputed' ? 'bg-red-100 text-red-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {sale.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {mySales.length === 0 && (
//               <div className="text-center py-12 text-gray-500">No sales yet</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };






import { useState, useEffect } from 'react';
import { Plus, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { DigitalAsset, Product, JobPosting, EscrowTransaction } from '../../types';
import './SellerDashboard.css'; // Import the new CSS file

export const SellerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'assets' | 'products' | 'jobs' | 'sales'>('assets');
  const [myAssets, setMyAssets] = useState<DigitalAsset[]>([]);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [availableJobs, setAvailableJobs] = useState<JobPosting[]>([]);
  const [mySales, setMySales] = useState<EscrowTransaction[]>([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    if (activeTab === 'assets') {
      const { data } = await supabase
        .from('digital_assets')
        .select('*')
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });
      setMyAssets(data || []);
    } else if (activeTab === 'products') {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });
      setMyProducts(data || []);
    } else if (activeTab === 'jobs') {
      const { data } = await supabase
        .from('job_postings')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });
      setAvailableJobs(data || []);
    } else if (activeTab === 'sales') {
      const { data } = await supabase
        .from('escrow_transactions')
        .select('*')
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });
      setMySales(data || []);
    }
  };

  const [assetTitle, setAssetTitle] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  const [assetCategory, setAssetCategory] = useState('source_code');
  const [assetPrice, setAssetPrice] = useState('');
  const [assetLicense, setAssetLicense] = useState('');
  const [assetFile, setAssetFile] = useState('');

  const handleUploadAsset = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('digital_assets')
      .insert({
        seller_id: user?.id,
        title: assetTitle,
        description: assetDescription,
        category: assetCategory,
        price: parseFloat(assetPrice),
        license_type: assetLicense,
        file_url: assetFile,
        status: 'pending_review',
      });

    if (!error) {
      alert('Asset uploaded successfully! Pending admin review.');
      setShowAssetForm(false);
      setAssetTitle('');
      setAssetDescription('');
      setAssetPrice('');
      setAssetLicense('');
      setAssetFile('');
      loadData();
    } else {
      alert('Failed to upload asset');
    }
  };

  const [productName, setProductName] = useState('');
  const [productSubject, setProductSubject] = useState('');
  const [productCountry, setProductCountry] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage1, setProductImage1] = useState('');
  const [productImage2, setProductImage2] = useState('');
  const [productType, setProductType] = useState('physical');

  const handlePostProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('products')
      .insert({
        seller_id: user?.id,
        product_name: productName,
        subject: productSubject,
        country: productCountry,
        price: parseFloat(productPrice),
        image_url_1: productImage1,
        image_url_2: productImage2,
        type: productType,
        status: 'active',
      });

    if (!error) {
      alert('Product posted successfully!');
      setShowProductForm(false);
      setProductName('');
      setProductSubject('');
      setProductCountry('');
      setProductPrice('');
      setProductImage1('');
      setProductImage2('');
      loadData();
    } else {
      alert('Failed to post product');
    }
  };

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidProposal, setBidProposal] = useState('');

  const handleSubmitBid = async (jobId: string) => {
    const { error } = await supabase
      .from('job_bids')
      .insert({
        job_id: jobId,
        seller_id: user?.id,
        bid_amount: parseFloat(bidAmount),
        proposal: bidProposal,
        status: 'pending',
      });

    if (!error) {
      alert('Bid submitted successfully!');
      setSelectedJobId(null);
      setBidAmount('');
      setBidProposal('');
    } else {
      alert('Failed to submit bid');
    }
  };

  return (
    <div className="seller-dashboard-container">
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('assets')}
          className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
        >
          My Digital Assets
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
        >
          My Products
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
        >
          Available Jobs
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`tab-button ${activeTab === 'sales' ? 'active' : ''}`}
        >
          My Sales
        </button>
      </div>

      {activeTab === 'assets' && (
        <div className="content">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">My Digital Assets</h2>
            <button
              onClick={() => setShowAssetForm(!showAssetForm)}
              className="post-job-button"
            >
              <Upload size={20} />
              <span>Upload Asset</span>
            </button>
          </div>

          {showAssetForm && (
            <div className="job-form">
              <h3 className="form-title">Upload Digital Asset</h3>
              <form onSubmit={handleUploadAsset} className="job-form-content">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={assetTitle}
                    onChange={(e) => setAssetTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={assetDescription}
                    onChange={(e) => setAssetDescription(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value)}
                  >
                    <option value="source_code">Source Code</option>
                    <option value="dataset">Data Set</option>
                    <option value="b2b_specialty">B2B Specialty</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={assetPrice}
                    onChange={(e) => setAssetPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>License Type</label>
                  <input
                    type="text"
                    value={assetLicense}
                    onChange={(e) => setAssetLicense(e.target.value)}
                    required
                    placeholder="e.g., MIT, Commercial, etc."
                  />
                </div>
                <div className="form-group">
                  <label>File URL</label>
                  <input
                    type="url"
                    value={assetFile}
                    onChange={(e) => setAssetFile(e.target.value)}
                    required
                    placeholder="https://example.com/file.zip"
                  />
                </div>
                <button type="submit">Upload Asset</button>
              </form>
            </div>
          )}

          <div className="grid">
            {myAssets.map((asset) => (
              <div key={asset.id} className="card">
                <h3>{asset.title}</h3>
                <p>{asset.description}</p>
                <div className="card-footer">
                  <span>${asset.price}</span>
                  <span className={asset.status.toLowerCase().replace('_', '-')}>{asset.status}</span>
                </div>
              </div>
            ))}
            {myAssets.length === 0 && <div className="no-items">No assets uploaded yet</div>}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="content">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">My Products</h2>
            <button
              onClick={() => setShowProductForm(!showProductForm)}
              className="post-job-button"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>

          {showProductForm && (
            <div className="job-form">
              <h3 className="form-title">Add New Product</h3>
              <form onSubmit={handlePostProduct} className="job-form-content">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    value={productSubject}
                    onChange={(e) => setProductSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={productCountry}
                    onChange={(e) => setProductCountry(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  >
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image 1 URL</label>
                  <input
                    type="url"
                    value={productImage1}
                    onChange={(e) => setProductImage1(e.target.value)}
                    required
                    placeholder="https://example.com/image1.jpg"
                  />
                </div>
                <div className="form-group">
                  <label>Image 2 URL</label>
                  <input
                    type="url"
                    value={productImage2}
                    onChange={(e) => setProductImage2(e.target.value)}
                    required
                    placeholder="https://example.com/image2.jpg"
                  />
                </div>
                <button type="submit">Post Product</button>
              </form>
            </div>
          )}

          <div className="grid">
            {myProducts.map((product) => (
              <div key={product.id} className="card">
                <img src={product.image_url_1} alt={product.product_name} className="card-image" />
                <h3>{product.product_name}</h3>
                <p>{product.subject}</p>
                <div className="card-footer">
                  <span>${product.price}</span>
                  <span className={product.status.toLowerCase().replace('_', '-')}>{product.status}</span>
                </div>
              </div>
            ))}
            {myProducts.length === 0 && <div className="no-items">No products posted yet</div>}
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="content">
          <h2 className="section-title">Available Jobs</h2>
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <div key={job.id} className="card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span>Budget: ${job.budget}</span>
                  <button
                    onClick={() => setSelectedJobId(job.id)}
                    className="card button"
                  >
                    Place Bid
                  </button>
                </div>

                {selectedJobId === job.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Submit Your Bid</h4>
                    <div className="space-y-3">
                      <div className="form-group">
                        <label>Bid Amount ($)</label>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="form-group">
                        <label>Proposal</label>
                        <textarea
                          value={bidProposal}
                          onChange={(e) => setBidProposal(e.target.value)}
                          required
                          rows={3}
                        />
                      </div>
                      <button
                        onClick={() => handleSubmitBid(job.id)}
                        className="card button"
                      >
                        Submit Bid
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {availableJobs.length === 0 && <div className="no-items">No jobs available</div>}
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="content">
          <h2 className="section-title">My Sales</h2>
          <div className="purchase-list">
            {mySales.map((sale) => (
              <div key={sale.id} className="purchase-card">
                <div>
                  <p>Transaction ID: {sale.id}</p>
                  <p>Amount: ${sale.amount}</p>
                  <p>Commission: ${sale.commission}</p>
                  <p>Type: {sale.reference_type}</p>
                </div>
                <span className={sale.status.toLowerCase().replace('_', '-')}>{sale.status}</span>
              </div>
            ))}
            {mySales.length === 0 && <div className="no-items">No sales yet</div>}
          </div>
        </div>
      )}
    </div>
  );
};