import { type ApplicationFormData } from '../lib/amplify';

// Sample companies data
const sampleCompanies = [
  {
    nameEng: "HealthTech Innovations Ltd",
    nameChi: "健康科技創新有限公司",
    entryTitleEng: "AI-Powered Health Monitoring System",
    entryTitleChi: "人工智能健康監測系統",
    description: "我們是一家專注於人工智能健康監測技術的創新公司，致力於為社區提供智能化的健康管理解決方案，通過先進的AI算法和物聯網設備，實現24小時健康監測，幫助用戶及早發現健康問題並採取預防措施。我們的產品已在多個社區試點應用，獲得用戶高度認可。",
    businessRegNo: "12345678901",
    incorporationNo: "2023001",
    address: "Unit 1201, Technology Park, Sha Tin, New Territories, Hong Kong",
    category: "health-innovation"
  },
  {
    nameEng: "WellCare Community Services",
    nameChi: "康護社區服務機構",
    entryTitleEng: "Community Wellness Outreach Program",
    entryTitleChi: "社區健康外展計劃",
    description: "康護社區服務機構是一個非營利組織，專門為香港偏遠地區和長者社群提供健康服務。我們的社區健康外展計劃已服務超過10,000名長者，提供免費健康檢查、健康教育講座和藥物管理服務。我們致力於縮小健康服務的地域差距，確保每個社區都能獲得優質的醫療保健服務。",
    businessRegNo: "98765432109",
    incorporationNo: "2022002",
    address: "G/F, 123 Community Centre Road, Tai Po, New Territories, Hong Kong",
    category: "healthy-community"
  },
  {
    nameEng: "GreenLife Supplements Co.",
    nameChi: "綠色生活保健品公司",
    entryTitleEng: "Organic Herbal Health Supplements",
    entryTitleChi: "有機草本保健品系列",
    description: "綠色生活保健品公司專門研發和生產有機草本保健品，所有產品均採用天然有機原料，不含人工添加劑。我們與本地農場合作，建立可持續的供應鏈，同時支持環保農業發展。產品已通過國際有機認證，在香港及東南亞地區銷售，深受注重健康生活的消費者喜愛。",
    businessRegNo: "11223344556",
    incorporationNo: "2023003",
    address: "15/F, Green Tower, Central, Hong Kong",
    category: "health-food-supplement"
  },
  {
    nameEng: "FitLife Wellness Studio",
    nameChi: "活力人生健康工作室",
    entryTitleEng: "Holistic Fitness and Wellness Program",
    entryTitleChi: "全方位健身及養生計劃",
    description: "活力人生健康工作室提供全方位的健身和養生服務，包括個人訓練、團體運動課程、營養諮詢和身心靈療程。我們的專業團隊包括註冊物理治療師、營養師和瑜伽導師，為客戶度身訂造健康管理方案。工作室採用環保材料裝修，營造舒適的運動環境，已幫助數千名客戶改善健康狀況。",
    businessRegNo: "55667788990",
    incorporationNo: "2023004",
    address: "2/F, Wellness Plaza, Causeway Bay, Hong Kong",
    category: "beauty-fitness"
  },
  {
    nameEng: "MediCare Plus Insurance",
    nameChi: "醫護加保險有限公司",
    entryTitleEng: "Comprehensive Health Protection Plan",
    entryTitleChi: "全面健康保障計劃",
    description: "醫護加保險公司專門提供創新的健康保險產品，我們的全面健康保障計劃不僅涵蓋醫療費用，還包括預防性健康檢查、健康管理諮詢和康復治療服務。我們與多家知名醫院和診所建立合作關係，為保戶提供優質的醫療網絡。公司致力於讓更多市民能夠負擔得起優質的醫療保險。",
    businessRegNo: "77889900112",
    incorporationNo: "2022005",
    address: "20/F, Insurance Tower, Admiralty, Hong Kong",
    category: "health-protection-planning"
  },
  {
    nameEng: "Digital Health Solutions",
    nameChi: "數碼健康解決方案有限公司",
    entryTitleEng: "Telemedicine Platform for Rural Communities",
    entryTitleChi: "偏遠社區遠程醫療平台",
    description: "數碼健康解決方案公司開發了一個創新的遠程醫療平台，專門服務香港偏遠地區和離島社區。平台結合人工智能診斷輔助系統和高清視頻通話技術，讓居民可以在家中接受專業醫生的診療服務。我們已與多家公立醫院合作，為偏遠地區居民提供24小時緊急醫療諮詢服務，大大提升了醫療服務的可及性。",
    businessRegNo: "33445566778",
    incorporationNo: "2023006",
    address: "8/F, Tech Hub, Kwun Tong, Kowloon, Hong Kong",
    category: "medical-professional"
  },
  {
    nameEng: "Natural Therapy Centre",
    nameChi: "自然療法中心",
    entryTitleEng: "Integrative Wellness and Therapeutic Services",
    entryTitleChi: "綜合養生治療服務",
    description: "自然療法中心結合傳統中醫和現代自然療法，為客戶提供全面的身心靈健康服務。我們的服務包括針灸、推拿、芳香療法、水療和冥想指導等。中心的治療師均具備專業資格和豐富經驗，採用天然無害的治療方法，幫助客戶恢復身心平衡，提升整體健康水平。我們特別關注都市人的壓力管理和情緒健康。",
    businessRegNo: "99887766554",
    incorporationNo: "2022007",
    address: "3/F, Wellness Building, Tsim Sha Tsui, Kowloon, Hong Kong",
    category: "wellness-therapeutic"
  },
  {
    nameEng: "EcoHealth Marketing Agency",
    nameChi: "生態健康市場推廣公司",
    entryTitleEng: "Sustainable Health Awareness Campaign",
    entryTitleChi: "可持續健康意識推廣活動",
    description: "生態健康市場推廣公司專門策劃環保主題的健康推廣活動，我們相信環境健康與人體健康息息相關。公司設計了一系列創新的市場推廣活動，包括社區環保健走、有機市集、減塑生活工作坊等，教育公眾如何透過環保生活方式改善個人和社區健康。我們的活動已惠及超過50,000名市民，獲得政府和環保組織的高度認可。",
    businessRegNo: "22334455667",
    incorporationNo: "2023008",
    address: "12/F, Marketing Centre, Wan Chai, Hong Kong",
    category: "marketing-campaign"
  },
  {
    nameEng: "Corporate Wellness Solutions",
    nameChi: "企業健康管理方案有限公司",
    entryTitleEng: "Employee Health and Productivity Program",
    entryTitleChi: "員工健康與生產力提升計劃",
    description: "企業健康管理方案公司專為香港中小企業設計員工健康管理計劃，透過健康風險評估、工作場所人體工學改善、壓力管理工作坊和團隊建設活動，全面提升員工的身心健康和工作效率。我們的計劃已幫助超過200家企業改善員工健康狀況，平均減少30%的病假天數，顯著提升企業生產力和員工滿意度。",
    businessRegNo: "66778899001",
    incorporationNo: "2022009",
    address: "18/F, Business Tower, Mong Kok, Kowloon, Hong Kong",
    category: "healthy-entrepreneurship"
  },
  {
    nameEng: "Community Care Foundation",
    nameChi: "社區關愛基金會",
    entryTitleEng: "Sustainable Healthcare Access Initiative",
    entryTitleChi: "可持續醫療服務普及計劃",
    description: "社區關愛基金會是一個致力於推動可持續醫療服務的慈善機構，我們的使命是確保社會上每個人都能獲得基本的醫療保健服務。基金會建立了一個可持續的醫療援助網絡，透過募款、志願服務和企業合作，為低收入家庭提供免費醫療服務。我們特別關注兒童健康和長者護理，已幫助超過15,000個家庭獲得必需的醫療支援。",
    businessRegNo: "44556677889",
    incorporationNo: "2021010",
    address: "5/F, Community Centre, Sha Tin, New Territories, Hong Kong",
    category: "sustainable-csr"
  }
];

// Sample contact information
const sampleContacts = [
  { name: "Chan Tai Man", nameChi: "陳大文", title: "Chief Executive Officer", phone: "98765432", email: "chan.taiman@healthtech.hk" },
  { name: "Wong Mei Ling", nameChi: "黃美玲", title: "Operations Director", phone: "87654321", email: "wong.meiling@wellcare.hk" },
  { name: "Li Ka Chung", nameChi: "李家聰", title: "Product Manager", phone: "76543210", email: "li.kachung@greenlife.hk" },
  { name: "Lau Wing Sze", nameChi: "劉詠詩", title: "Wellness Coordinator", phone: "65432109", email: "lau.wingsze@fitlife.hk" },
  { name: "Cheung Ho Fai", nameChi: "張浩輝", title: "Insurance Manager", phone: "54321098", email: "cheung.hofai@medicare.hk" },
  { name: "Tam Yiu Kwong", nameChi: "譚耀光", title: "Technology Director", phone: "43210987", email: "tam.yiukwong@digitalhealth.hk" },
  { name: "Ng Sau Ping", nameChi: "吳秀萍", title: "Senior Therapist", phone: "32109876", email: "ng.sauping@naturaltherapy.hk" },
  { name: "Ho Wai Kit", nameChi: "何偉傑", title: "Marketing Director", phone: "21098765", email: "ho.waikit@ecohealth.hk" },
  { name: "Yip Chi Hong", nameChi: "葉志康", title: "HR Manager", phone: "10987654", email: "yip.chihong@corporate.hk" },
  { name: "Fong Ka Man", nameChi: "方嘉雯", title: "Program Director", phone: "90876543", email: "fong.kaman@community.hk" }
];

export function generateSampleData(index: number): ApplicationFormData {
  const company = sampleCompanies[index];
  const primaryContact = sampleContacts[index];
  const secondaryContact = sampleContacts[(index + 1) % sampleContacts.length];
  
  return {
    // Part I - Entry Information
    companyNameEng: company.nameEng,
    companyNameChi: company.nameChi,
    entryTitleEng: company.entryTitleEng,
    entryTitleChi: company.entryTitleChi,
    logoAI: null, // Will be handled separately for file uploads
    logoJPEG: null, // Will be handled separately for file uploads
    brandGuideline: null, // Will be handled separately for file uploads
    companyDescription: company.description,
    businessRegNo: company.businessRegNo,
    incorporationNo: company.incorporationNo,
    incorporationDate: `202${2 + (index % 3)}-0${(index % 9) + 1}-${10 + (index % 20)}`,
    companyAddress: company.address,
    
    // Part II - Contact Details
    primaryContactName: primaryContact.name,
    primaryContactTitle: primaryContact.title,
    primaryContactPhone: primaryContact.phone,
    primaryContactEmail: primaryContact.email,
    secondaryContactName: secondaryContact.name,
    secondaryContactTitle: secondaryContact.title,
    secondaryContactPhone: secondaryContact.phone,
    secondaryContactEmail: secondaryContact.email,
    
    // Part III - Award Categories
    awardCategory: company.category,
    
    // Part IV - Judging Materials
    supportingDocument: null, // Will be handled separately for file uploads
    videoLink: `https://youtube.com/watch?v=sample${index + 1}`,
    
    // Declaration
    submissionUsage: true,
    applicationDeclaration: true,
    patentStatus: index % 2 === 0 ? "no-patent" : "has-patent",
    intellectualProperty: index % 3 === 0 ? "no-dispute" : "has-dispute",
    eventAdminCost: true,
    verifyCode: "6J149"
  };
} 