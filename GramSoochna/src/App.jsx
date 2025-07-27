import { useState } from 'react'
import './App.css'
import { FaBullhorn, FaBell, FaFileAlt, FaComments, FaSignInAlt, FaUserCog, FaSearch, FaMicrophone, FaGlobe } from 'react-icons/fa';
import { MdDateRange, MdHome, MdGavel, MdPolicy } from 'react-icons/md';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('English');
  const [isAdmin, setIsAdmin] = useState(false);
  const [notices, setNotices] = useState([
    { id: 1, title: 'Vaccination Camp', date: '2025-06-15', type: 'health', urgent: true, content: 'Free ELEPHANTIASIS vaccination camp on jun 15 at village health center from 10 AM to 4 PM' },
    { id: 2, title: 'Road Repair', date: '2025-06-10', type: 'infra', urgent: false, content: 'Main road to be closed for repairs from jun 10-12. Alternate route via School Road.' },
    { id: 3, title: 'Farmers Training', date: '2025-06-05', type: 'agri', urgent: false, content: 'Organic farming training session on jun 5 at Gram Panchayat office. Free lunch provided.' },
  ]);
  const [noticeTypeFilter, setNoticeTypeFilter] = useState('all');

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'हिंदी' : 'English');
  };

  const filteredNotices = notices.filter(notice => 
    noticeTypeFilter === 'all' || notice.type === noticeTypeFilter
  );

  const renderHome = () => (
    <div className="space-y-8">
      <div className="relative">
        <img 
          src="https://placehold.co/1600x900" 
          alt="A rural Indian village setting with a digital notice board overlay showing the GramSuchna app on a mobile phone. The scene includes farmers in fields, village homes, and a panchayat office in the background." 
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'English' ? 'GramSuchna - Digital Village Notice Board' : 'ग्रामसेतु - डिजिटल ग्राम नोटिस बोर्ड'}
            </h1>
            <p className="text-xl">
              {language === 'English' ? 'Connecting rural communities with important information' : 'ग्रामीण समुदायों को महत्वपूर्ण सूचनाओं से जोड़ना'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<FaBullhorn className="text-4xl" />}
          title={language === 'English' ? 'Latest Notices' : 'नवीनतम सूचनाएं'}
          color="bg-amber-100"
          onClick={() => setActiveTab('notices')}
        />
        <FeatureCard
          icon={<FaBell className="text-4xl" />}
          title={language === 'English' ? 'Panchayat Updates' : 'पंचायत अपडेट'}
          color="bg-blue-100"
        />
        <FeatureCard
          icon={<FaComments className="text-4xl" />}
          title={language === 'English' ? 'Grievance Corner' : 'शिकायत कोना'}
          color="bg-green-100"
        />
        <FeatureCard
          icon={<FaFileAlt className="text-4xl" />}
          title={language === 'English' ? 'Schemes & Announcements' : 'योजनाएं और घोषणाएं'}
          color="bg-red-100"
        />
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">
          {language === 'English' ? 'Urgent Notices' : 'अत्यावश्यक सूचनाएं'}
        </h2>
        <div className="space-y-3">
          {notices.filter(n => n.urgent).map(notice => (
            <div key={notice.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{notice.title}</h3>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{language === 'English' ? 'URGENT' : 'अत्यावश्यक'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
              <p className="text-xs text-gray-500 mt-2">{notice.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotices = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder={language === 'English' ? 'Search notices...' : 'सूचनाएं खोजें...'}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => setNoticeTypeFilter('all')}
            className={`px-4 py-2 rounded-full text-sm ${noticeTypeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
          >
            {language === 'English' ? 'All' : 'सभी'}
          </button>
          <button 
            onClick={() => setNoticeTypeFilter('health')}
            className={`px-4 py-2 rounded-full text-sm ${noticeTypeFilter === 'health' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            {language === 'English' ? 'Health' : 'स्वास्थ्य'}
          </button>
          <button 
            onClick={() => setNoticeTypeFilter('infra')}
            className={`px-4 py-2 rounded-full text-sm ${noticeTypeFilter === 'infra' ? 'bg-yellow-600 text-white' : 'bg-gray-100'}`}
          >
            {language === 'English' ? 'Infrastructure' : 'बुनियादी ढांचा'}
          </button>
          <button 
            onClick={() => setNoticeTypeFilter('agri')}
            className={`px-4 py-2 rounded-full text-sm ${noticeTypeFilter === 'agri' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
          >
            {language === 'English' ? 'Agriculture' : 'कृषि'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredNotices.map(notice => (
          <div key={notice.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-xl">{notice.title}</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{new Date(notice.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mt-2">{notice.content}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded ${notice.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {notice.urgent ? (language === 'English' ? 'Urgent' : 'अत्यावश्यक') : 'Normal'}
              </span>
              <button className="text-green-600 hover:underline text-sm">
                {language === 'English' ? 'Read more' : 'और पढ़ें'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdminPanel = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{language === 'English' ? 'Admin Dashboard' : 'प्रशासन डैशबोर्ड'}</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {language === 'English' ? 'Add New Notice' : 'नई सूचना जोड़ें'}
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'English' ? 'Title' : 'शीर्षक'}
            </label>
            <input type="text" className="w-full p-2 border rounded-md" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'English' ? 'Content' : 'विषय वस्तु'}
            </label>
            <textarea className="w-full p-2 border rounded-md h-32"></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'English' ? 'Notice Type' : 'सूचना प्रकार'}
              </label>
              <select className="w-full p-2 border rounded-md">
                <option>{language === 'English' ? 'General' : 'सामान्य'}</option>
                <option>{language === 'English' ? 'Health' : 'स्वास्थ्य'}</option>
                <option>{language === 'English' ? 'Agriculture' : 'कृषि'}</option>
                <option>{language === 'English' ? 'Infrastructure' : 'बुनियादी ढांचा'}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'English' ? 'Expiry Date' : 'समाप्ति तिथि'}
              </label>
              <input type="date" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" id="urgent" className="mr-2" />
            <label htmlFor="urgent">
              {language === 'English' ? 'Mark as urgent' : 'अत्यावश्यक के रूप में चिह्नित करें'}
            </label>
          </div>
          
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'English' ? 'Upload Attachment' : 'अनुलग्नक अपलोड करें'}
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    {language === 'English' ? 'Click to upload document or image' : 'दस्तावेज़ या छवि अपलोड करने के लिए क्लिक करें'}
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="button" className="px-6 py-2 bg-gray-200 rounded-md mr-3">
              {language === 'English' ? 'Cancel' : 'रद्द करें'}
            </button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
              {language === 'English' ? 'Publish Notice' : 'सूचना प्रकाशित करें'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {language === 'English' ? 'Recent Notices' : 'हाल की सूचनाएं'}
          </h3>
          <span className="text-sm text-gray-500">
            {notices.length} {language === 'English' ? 'notices' : 'सूचनाएं'}
          </span>
        </div>
        
        <div className="space-y-3">
          {notices.map(notice => (
            <div key={notice.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 rounded">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{notice.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-1">{notice.content}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FeatureCard = ({ icon, title, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`${color} p-6 rounded-xl cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] flex flex-col items-center text-center h-full`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm opacity-80">
        {language === 'English' 
          ? 'Click to view all notices in this category' 
          : 'इस श्रेणी में सभी सूचनाएं देखने के लिए क्लिक करें'}
      </p>
    </div>
  );

  const NavItem = ({ icon, label, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex flex-col items-center p-2 ${
        activeTab === tabName ? 'text-green-600' : 'text-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="font-bold text-xl text-green-700">
                {language === 'English' ? 'GramSuchna' : 'ग्रामसूचना'}
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <NavItem 
                icon={<MdHome size={20} />} 
                label={language === 'English' ? 'Home' : 'होम'} 
                tabName="home" 
              />
              <NavItem 
                icon={<FaBullhorn size={20} />} 
                label={language === 'English' ? 'Notices' : 'सूचनाएं'} 
                tabName="notices" 
              />
              <NavItem 
                icon={<FaComments size={20} />} 
                label={language === 'English' ? 'Grievance' : 'शिकायत'} 
                tabName="grievance" 
              />
              <NavItem 
                icon={<MdPolicy size={20} />} 
                label={language === 'English' ? 'Schemes' : 'योजनाएं'} 
                tabName="schemes" 
              />
              
              {isAdmin && (
                <NavItem 
                  icon={<FaUserCog size={20} />} 
                  label={language === 'English' ? 'Admin' : 'प्रशासन'} 
                  tabName="admin" 
                />
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleLanguage}
                className="flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaGlobe className="mr-1" />
                <span>{language === 'English' ? 'हिंदी' : 'English'}</span>
              </button>
              
              {!isAdmin && (
                <button 
                  onClick={() => setIsAdmin(true)}
                  className="hidden md:flex items-center px-3 py-1 rounded-full bg-green-600 text-white hover:bg-green-700"
                >
                  <FaSignInAlt className="mr-1" />
                  <span>{language === 'English' ? 'Admin Login' : 'प्रशासन लॉगिन'}</span>
                </button>
              )}
              
              <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile voice command button - sticky at bottom on mobile */}
          <div className="md:hidden fixed bottom-4 right-4 z-20">
            <button className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700">
              <FaMicrophone size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'notices' && renderNotices()}
        {isAdmin && activeTab === 'admin' && renderAdminPanel()}
        {activeTab === 'grievance' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'English' ? 'Submit a Grievance' : 'शिकायत दर्ज करें'}
            </h2>
            <p className="mb-4">
              {language === 'English' 
                ? 'Your concerns matter to us. Please describe your issue and we will address it promptly.' 
                : 'आपकी चिंताएं हमारे लिए महत्वपूर्ण हैं। कृपया अपनी समस्या का विवरण दें और हम इसे शीघ्र ही हल करेंगे।'}
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'English' ? 'Subject' : 'विषय'}
                </label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'English' ? 'Description' : 'विवरण'}
                </label>
                <textarea className="w-full p-2 border rounded-md h-32"></textarea>
              </div>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md">
                {language === 'English' ? 'Submit' : 'जमा करें'}
              </button>
            </form>
          </div>
        )}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              {language === 'English' ? 'Government Schemes' : 'सरकारी योजनाएं'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SchemeCard
                title={language === 'English' ? 'PM Kisan Samman Nidhi' : 'पीएम किसान सम्मान निधि'}
                description={language === 'English' 
                  ? 'Financial support of ₹6,000 per year to small and marginal farmers' 
                  : 'छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की वित्तीय सहायता'}
                icon="https://placehold.co/100x100"
              />
              <SchemeCard
                title={language === 'English' ? 'Ujjwala Yojana' : 'उज्ज्वला योजना'}
                description={language === 'English' 
                  ? 'Free LPG connections to women from below poverty line families' 
                  : 'गरीबी रेखा से नीचे जीवन यापन करने वाले परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन'}
                icon="https://placehold.co/100x100"
              />
              <SchemeCard
                title={language === 'English' ? 'Swachh Bharat Abhiyan' : 'स्वच्छ भारत अभियान'}
                description={language === 'English' 
                  ? 'Construction of toilets and elimination of open defecation' 
                  : 'शौचालयों का निर्माण और खुले में शौच को खत्म करना'}
                icon="https://placehold.co/100x100"
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {language === 'English' ? 'Quick Links' : 'त्वरित लिंक'}
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">{language === 'English' ? 'About GramSetu' : 'ग्रामसेतु के बारे में'}</a></li>
                <li><a href="#" className="hover:underline">{language === 'English' ? 'Contact Us' : 'संपर्क करें'}</a></li>
                <li><a href="#" className="hover:underline">{language === 'English' ? 'Privacy Policy' : 'गोपनीयता नीति'}</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {language === 'English' ? 'Contact Information' : 'संपर्क जानकारी'}
              </h3>
              <address className="not-italic space-y-2">
                <div>{language === 'English' ? 'Gram Panchayat Office' : 'ग्राम पंचायत कार्यालय'}</div>
                <div>{language === 'English' ? 'Village Main Road' : 'गाँव का मुख्य मार्ग'}</div>
                <div>Email: panchayat@gramsetu.in</div>
                <div>{language === 'English' ? 'Helpline' : 'हेल्पलाइन'}: 1800-123-4567</div>
              </address>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {language === 'English' ? 'Our Partners' : 'हमारे सहयोगी'}
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <img 
                  src="https://placehold.co/120x60" 
                  alt="Digital India logo with tricolor theme and silhouette of Indian map" 
                  className="h-12 object-contain"
                />
                <img 
                  src="https://placehold.co/120x60" 
                  alt="Government of India logo with Ashoka Pillar emblem" 
                  className="h-12 object-contain"
                />
                <img 
                  src="https://placehold.co/120x60" 
                  alt="State Rural Development Department logo with village motif" 
                  className="h-12 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-6 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} {language === 'English' 
                ? 'GramSetu - Digital Notice Board for Rural India' 
                : 'ग्रामसेतु - ग्रामीण भारत के लिए डिजिटल नोटिस बोर्ड'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SchemeCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
    <div className="flex items-start mb-4">
      <img src={icon} alt={`${title} scheme icon`} className="w-12 h-12 object-contain mr-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-700">{description}</p>
    <button className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200">
      Read More
    </button>
  </div>
);

export default App;

