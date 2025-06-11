import React, { useState } from 'react';
import '../../assets/styles/2025/form.css';
import { ApplicationService } from '../../services/applicationService';
import { type ApplicationFormData } from '../../lib/amplify';

interface FormData {
  // Part I - Entry Information
  companyNameEng: string;
  companyNameChi: string;
  entryTitleEng: string;
  entryTitleChi: string;
  logoAI: File | null;
  logoJPEG: File | null;
  brandGuideline: File | null;
  companyDescription: string;
  businessRegNo: string;
  incorporationNo: string;
  incorporationDate: string;
  companyAddress: string;
  
  // Part II - Contact Details
  primaryContactName: string;
  primaryContactTitle: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  secondaryContactName: string;
  secondaryContactTitle: string;
  secondaryContactPhone: string;
  secondaryContactEmail: string;
  
  // Part III - Award Categories
  awardCategory: string;
  
  // Part IV - Judging Materials
  supportingDocument: File | null;
  videoLink: string;
  
  // Declaration
  submissionUsage: boolean;
  applicationDeclaration: boolean;
  patentStatus: string;
  intellectualProperty: string;
  eventAdminCost: boolean;
  verifyCode: string;
}

const Form2025: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyNameEng: '',
    companyNameChi: '',
    entryTitleEng: '',
    entryTitleChi: '',
    logoAI: null,
    logoJPEG: null,
    brandGuideline: null,
    companyDescription: '',
    businessRegNo: '',
    incorporationNo: '',
    incorporationDate: '',
    companyAddress: '',
    primaryContactName: '',
    primaryContactTitle: '',
    primaryContactPhone: '',
    primaryContactEmail: '',
    secondaryContactName: '',
    secondaryContactTitle: '',
    secondaryContactPhone: '',
    secondaryContactEmail: '',
    awardCategory: '',
    supportingDocument: null,
    videoLink: '',
    submissionUsage: false,
    applicationDeclaration: false,
    patentStatus: '',
    intellectualProperty: '',
    eventAdminCost: false,
    verifyCode: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll event to show/hide scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const awardCategories = [
    { value: 'beauty-fitness', label: 'Beauty & Fitness', labelChi: '美容及健美' },
    { value: 'health-personal-care', label: 'Health & Personal Care Product', labelChi: '健康及個人護理用品' },
    { value: 'health-food-supplement', label: 'Health Food & Supplement', labelChi: '健康食品及保健品' },
    { value: 'health-innovation', label: 'Health Innovation', labelChi: '健康創新' },
    { value: 'health-protection-planning', label: 'Health Protection & Planning', labelChi: '健康保障及策劃' },
    { value: 'healthy-community', label: 'Healthy Community Partnership', labelChi: '社區健康合作夥伴' },
    { value: 'healthy-entrepreneurship', label: 'Healthy Entrepreneurship', labelChi: '企業健康管理' },
    { value: 'marketing-campaign', label: 'Marketing Campaign', labelChi: '行銷活動' },
    { value: 'medical-professional', label: 'Medical & Professional Service', labelChi: '醫療及專業服務' },
    { value: 'sustainable-csr', label: 'Sustainable Corporate Social Responsibility', labelChi: '可持續企業社會責任' },
    { value: 'wellness-therapeutic', label: 'Wellness & Therapeutic', labelChi: '身心靈健康及療程' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Required fields validation
    if (!formData.companyNameEng) newErrors.companyNameEng = 'Company Name (English) is required';
    if (!formData.entryTitleEng) newErrors.entryTitleEng = 'Entry Title (English) is required';
    if (!formData.logoAI) newErrors.logoAI = 'AI/EPS logo file is required';
    if (!formData.logoJPEG) newErrors.logoJPEG = 'JPEG logo file is required';
    if (!formData.brandGuideline) newErrors.brandGuideline = 'Brand guideline is required';
    if (!formData.companyDescription) newErrors.companyDescription = 'Company description is required';
    if (!formData.businessRegNo) newErrors.businessRegNo = 'Business Registration No. is required';
    if (!formData.incorporationNo) newErrors.incorporationNo = 'Certificate of Incorporation No. is required';
    if (!formData.incorporationDate) newErrors.incorporationDate = 'Date of Incorporation is required';
    if (!formData.companyAddress) newErrors.companyAddress = 'Company Address is required';
    if (!formData.primaryContactName) newErrors.primaryContactName = 'Primary Contact Name is required';
    if (!formData.primaryContactTitle) newErrors.primaryContactTitle = 'Primary Contact Title is required';
    if (!formData.primaryContactPhone) newErrors.primaryContactPhone = 'Primary Contact Phone is required';
    if (!formData.primaryContactEmail) newErrors.primaryContactEmail = 'Primary Contact Email is required';
    if (!formData.secondaryContactName) newErrors.secondaryContactName = 'Secondary Contact Name is required';
    if (!formData.secondaryContactTitle) newErrors.secondaryContactTitle = 'Secondary Contact Title is required';
    if (!formData.secondaryContactPhone) newErrors.secondaryContactPhone = 'Secondary Contact Phone is required';
    if (!formData.secondaryContactEmail) newErrors.secondaryContactEmail = 'Secondary Contact Email is required';
    if (!formData.awardCategory) newErrors.awardCategory = 'Award category selection is required';
    if (!formData.supportingDocument) newErrors.supportingDocument = 'Supporting document is required';
    if (!formData.submissionUsage) newErrors.submissionUsage = 'Submission usage agreement is required';
    if (!formData.applicationDeclaration) newErrors.applicationDeclaration = 'Application declaration is required';
    if (!formData.patentStatus) newErrors.patentStatus = 'Patent status selection is required';
    if (!formData.intellectualProperty) newErrors.intellectualProperty = 'Intellectual property declaration is required';
    if (!formData.eventAdminCost) newErrors.eventAdminCost = 'Event administration cost agreement is required';
    if (!formData.verifyCode) newErrors.verifyCode = 'Verification code is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.primaryContactEmail && !emailRegex.test(formData.primaryContactEmail)) {
      newErrors.primaryContactEmail = 'Invalid email format';
    }
    if (formData.secondaryContactEmail && !emailRegex.test(formData.secondaryContactEmail)) {
      newErrors.secondaryContactEmail = 'Invalid email format';
    }

    // Phone validation (Hong Kong format)
    const phoneRegex = /^[0-9]{8}$/;
    if (formData.primaryContactPhone && !phoneRegex.test(formData.primaryContactPhone.replace(/\s/g, ''))) {
      newErrors.primaryContactPhone = 'Invalid phone format (8 digits required)';
    }
    if (formData.secondaryContactPhone && !phoneRegex.test(formData.secondaryContactPhone.replace(/\s/g, ''))) {
      newErrors.secondaryContactPhone = 'Invalid phone format (8 digits required)';
    }

    // Company description word count (max 250 words in Chinese)
    if (formData.companyDescription && formData.companyDescription.length > 250) {
      newErrors.companyDescription = 'Company description must not exceed 250 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await ApplicationService.submitApplication(formData as ApplicationFormData);
      
      if (result.success) {
        alert(`Application submitted successfully! Application ID: ${result.applicationId}\nYou will receive a confirmation email shortly.`);
        // Reset form or redirect to success page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(`Error submitting application: ${result.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="standalone-form-page">
      {/* Page Header */}
      <div className="page-header">
        🏥 2025 Health Partnership Awards - Application Form
      </div>
      
      {/* UAT Badge */}
      <div className="uat-badge">UAT測試</div>

      {/* Cover Section */}
      <div className="form-cover-section">
        <div className="form-cover-content">
          <h1 className="cover-main-title">
            2025健康同行夥伴大獎
          </h1>
          <h2 className="cover-subtitle">
            Health Partnership Awards 2025
          </h2>
          <p className="cover-tagline">
            Building Healthier Communities Together
          </p>
          
          <div className="cover-form-card">
            <h1>Application Form 參賽表格</h1>
            <p>
              Join us in recognizing excellence in health innovation and community wellness
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <div className="form-intro">
          <p>
            Please fill in all parts of this Form and attach additional information where necessary.<br/>
            Submission by email to <a href="mailto:whexpo@etnet.com.hk">whexpo@etnet.com.hk</a> should be delivered on or before <strong>20 Aug 2025</strong>.
          </p>
          <p>
            請填寫所有部分，如有需要請附加額外資訊。<br/>
            申請者可透過於2025年8月20日或之前以電子表格電郵到 <a href="mailto:whexpo@etnet.com.hk">whexpo@etnet.com.hk</a>。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          {/* Part I - Entry Information */}
          <div className="form-section">
            <h2>Part I - Entry Information 參賽作品摘要</h2>
            <p className="note">
              *Note 備註: The below entry information will be featured in the award materials. 以下參賽作品摘要將刊登於活動相關物品。
            </p>

            <div className="form-group">
              <label>Company Name 公司名稱</label>
              <div className="input-row">
                <div className="input-group">
                  <label className="sub-label">ENG *</label>
                  <input
                    type="text"
                    className={errors.companyNameEng ? 'error' : ''}
                    value={formData.companyNameEng}
                    onChange={(e) => handleInputChange('companyNameEng', e.target.value)}
                    required
                  />
                  {errors.companyNameEng && <span className="error-message">{errors.companyNameEng}</span>}
                </div>
                <div className="input-group">
                  <label className="sub-label">中</label>
                  <input
                    type="text"
                    value={formData.companyNameChi}
                    onChange={(e) => handleInputChange('companyNameChi', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Entry Title 參賽作品名稱</label>
              <div className="input-row">
                <div className="input-group">
                  <label className="sub-label">ENG *</label>
                  <input
                    type="text"
                    className={errors.entryTitleEng ? 'error' : ''}
                    value={formData.entryTitleEng}
                    onChange={(e) => handleInputChange('entryTitleEng', e.target.value)}
                    required
                  />
                  {errors.entryTitleEng && <span className="error-message">{errors.entryTitleEng}</span>}
                </div>
                <div className="input-group">
                  <label className="sub-label">中</label>
                  <input
                    type="text"
                    value={formData.entryTitleChi}
                    onChange={(e) => handleInputChange('entryTitleChi', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Logo 商標</label>
              <p className="description">
                Please provide logo in below formats and logo guideline. 請提供以下商標格式及商標使用指引:<br/>
                *Note：Logo will apply for all marketing materials. 備註：商標將刊登於宣傳及推廣資料上。
              </p>
              
              <div className="file-uploads">
                <div className="file-upload-item">
                  <label className="sub-label">1. AI or EPS (color in CMYK) *</label>
                  <input
                    type="file"
                    accept=".ai,.eps"
                    className={errors.logoAI ? 'error' : ''}
                    onChange={(e) => handleFileChange('logoAI', e.target.files?.[0] || null)}
                    required
                  />
                  {errors.logoAI && <span className="error-message">{errors.logoAI}</span>}
                </div>
                
                <div className="file-upload-item">
                  <label className="sub-label">2. JPEG (color in CMYK) *</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg"
                    className={errors.logoJPEG ? 'error' : ''}
                    onChange={(e) => handleFileChange('logoJPEG', e.target.files?.[0] || null)}
                    required
                  />
                  {errors.logoJPEG && <span className="error-message">{errors.logoJPEG}</span>}
                </div>
                
                <div className="file-upload-item">
                  <label className="sub-label">3. Corporate logo and brand guideline in PowerPoint / PDF format (max. file size：5 MB) *</label>
                  <p className="description">請以簡報 / PDF提供商標使用指引。(檔案容量不多於5 MB)</p>
                  <input
                    type="file"
                    accept=".ppt,.pptx,.pdf"
                    className={errors.brandGuideline ? 'error' : ''}
                    onChange={(e) => handleFileChange('brandGuideline', e.target.files?.[0] || null)}
                    required
                  />
                  {errors.brandGuideline && <span className="error-message">{errors.brandGuideline}</span>}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Company Description 公司簡介*</label>
              <p className="description">Please state no more than 250 words in Chinese. 請使用中文在250字以內作出簡介</p>
              <textarea
                className={errors.companyDescription ? 'error' : ''}
                rows={6}
                maxLength={250}
                value={formData.companyDescription}
                onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                required
              />
              <div className="char-count">{formData.companyDescription.length}/250</div>
              {errors.companyDescription && <span className="error-message">{errors.companyDescription}</span>}
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Business Registration Certificate No. 商業登記證號碼 *</label>
                <input
                  type="text"
                  className={errors.businessRegNo ? 'error' : ''}
                  value={formData.businessRegNo}
                  onChange={(e) => handleInputChange('businessRegNo', e.target.value)}
                  required
                />
                {errors.businessRegNo && <span className="error-message">{errors.businessRegNo}</span>}
              </div>
              
              <div className="input-group">
                <label>Certificate of Incorporation No. 公司註冊證書號碼 *</label>
                <input
                  type="text"
                  className={errors.incorporationNo ? 'error' : ''}
                  value={formData.incorporationNo}
                  onChange={(e) => handleInputChange('incorporationNo', e.target.value)}
                  required
                />
                {errors.incorporationNo && <span className="error-message">{errors.incorporationNo}</span>}
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Date of Incorporation 公司成立日期 *</label>
                <input
                  type="date"
                  className={errors.incorporationDate ? 'error' : ''}
                  value={formData.incorporationDate}
                  onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
                  required
                />
                {errors.incorporationDate && <span className="error-message">{errors.incorporationDate}</span>}
              </div>
              
              <div className="input-group">
                <label>Company Address 公司地址 *</label>
                <textarea
                  className={errors.companyAddress ? 'error' : ''}
                  rows={3}
                  value={formData.companyAddress}
                  onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                  required
                />
                {errors.companyAddress && <span className="error-message">{errors.companyAddress}</span>}
              </div>
            </div>
          </div>

          {/* Part II - Contact Details */}
          <div className="form-section">
            <h2>Part II - Contact Details - 聯絡人資料</h2>
            
            <h4>Primary Contact Person 第一聯絡人</h4>
            <div className="input-row">
              <div className="input-group">
                <label>Name 姓名*</label>
                <input
                  type="text"
                  className={errors.primaryContactName ? 'error' : ''}
                  value={formData.primaryContactName}
                  onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                  required
                />
                {errors.primaryContactName && <span className="error-message">{errors.primaryContactName}</span>}
              </div>
              
              <div className="input-group">
                <label>Title 職位*</label>
                <input
                  type="text"
                  className={errors.primaryContactTitle ? 'error' : ''}
                  value={formData.primaryContactTitle}
                  onChange={(e) => handleInputChange('primaryContactTitle', e.target.value)}
                  required
                />
                {errors.primaryContactTitle && <span className="error-message">{errors.primaryContactTitle}</span>}
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Phone 電話*</label>
                <input
                  type="tel"
                  className={errors.primaryContactPhone ? 'error' : ''}
                  value={formData.primaryContactPhone}
                  onChange={(e) => handleInputChange('primaryContactPhone', e.target.value)}
                  placeholder="852"
                  required
                />
                {errors.primaryContactPhone && <span className="error-message">{errors.primaryContactPhone}</span>}
              </div>
              
              <div className="input-group">
                <label>Email 電郵*</label>
                <input
                  type="email"
                  className={errors.primaryContactEmail ? 'error' : ''}
                  value={formData.primaryContactEmail}
                  onChange={(e) => handleInputChange('primaryContactEmail', e.target.value)}
                  required
                />
                {errors.primaryContactEmail && <span className="error-message">{errors.primaryContactEmail}</span>}
              </div>
            </div>

            <h4>Secondary Contact Person 第二聯絡人</h4>
            <div className="input-row">
              <div className="input-group">
                <label>Name 姓名*</label>
                <input
                  type="text"
                  className={errors.secondaryContactName ? 'error' : ''}
                  value={formData.secondaryContactName}
                  onChange={(e) => handleInputChange('secondaryContactName', e.target.value)}
                  required
                />
                {errors.secondaryContactName && <span className="error-message">{errors.secondaryContactName}</span>}
              </div>
              
              <div className="input-group">
                <label>Title 職位*</label>
                <input
                  type="text"
                  className={errors.secondaryContactTitle ? 'error' : ''}
                  value={formData.secondaryContactTitle}
                  onChange={(e) => handleInputChange('secondaryContactTitle', e.target.value)}
                  required
                />
                {errors.secondaryContactTitle && <span className="error-message">{errors.secondaryContactTitle}</span>}
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Phone 電話*</label>
                <input
                  type="tel"
                  className={errors.secondaryContactPhone ? 'error' : ''}
                  value={formData.secondaryContactPhone}
                  onChange={(e) => handleInputChange('secondaryContactPhone', e.target.value)}
                  placeholder="852"
                  required
                />
                {errors.secondaryContactPhone && <span className="error-message">{errors.secondaryContactPhone}</span>}
              </div>
              
              <div className="input-group">
                <label>Email 電郵*</label>
                <input
                  type="email"
                  className={errors.secondaryContactEmail ? 'error' : ''}
                  value={formData.secondaryContactEmail}
                  onChange={(e) => handleInputChange('secondaryContactEmail', e.target.value)}
                  required
                />
                {errors.secondaryContactEmail && <span className="error-message">{errors.secondaryContactEmail}</span>}
              </div>
            </div>
          </div>

          {/* Part III - Award Categories */}
          <div className="form-section">
            <h2>Part III - Award Categories 獎項類別</h2>
            <div className="note">
              *Note 備註:<br/>
              ONE entry is only allowed to enter ONE award stream. 參賽作品只可參加一個獎項類別。<br/>
              The applicant is advised to submit its application(s) to the most appropriate category. The Organiser reserves the rights to reallocate a submission to the most appropriate category if needed.<br/>
              參賽機構所遞交的參賽作品應呈交至最適當的獎項類別，主辦機構保留權利更改參賽作品至更適合之獎項類別。
            </div>

            <div className="form-group">
              <label>Please tick the award category to be considered: 請選擇參賽的獎項類別以供參考:*</label>
              <div className="radio-group">
                {awardCategories.map((category) => (
                  <div key={category.value} className="radio-item">
                    <input
                      type="radio"
                      id={category.value}
                      name="awardCategory"
                      value={category.value}
                      checked={formData.awardCategory === category.value}
                      onChange={(e) => handleInputChange('awardCategory', e.target.value)}
                      required
                    />
                    <label htmlFor={category.value}>
                      <div className="radio-title">{category.label}</div>
                      <div className="radio-subtitle">{category.labelChi}</div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.awardCategory && <span className="error-message">{errors.awardCategory}</span>}
            </div>
          </div>

          {/* Part IV - Judging Materials */}
          <div className="form-section">
            <h2>Part IV – Judging Materials 評審資料</h2>
            
            <p className="description">
              Please submit relevant supporting documents with respect to the following judging criteria:<br/>
              請就以下評審準則提交參賽作品的資料：
            </p>

            <ul className="criteria-list">
              <li>Reputation聲譽 (20%)</li>
              <li>Innovation創新 (15%)</li>
              <li>Quality 素質 (20%)</li>
              <li>Benefits裨益 (20%)</li>
              <li>Corporate Social Responsibility (e.g. Environmental Protection and Social Welfare)<br/>
                  企業社會責任 (例如：環境保育或社會福利) (25%)</li>
            </ul>

            <div className="form-group">
              <label>Submission of Entry 提交參賽資料</label>
              <p className="description">
                Supporting document should not more than 5 pages in PowerPoint / PDF format. (max. file size：5 MB)*<br/>
                請提供不多於五頁簡報 / PDF 資料以作評審參考。(檔案容量不多於5 MB)*
              </p>
              <input
                type="file"
                accept=".ppt,.pptx,.pdf"
                className={errors.supportingDocument ? 'error' : ''}
                onChange={(e) => handleFileChange('supportingDocument', e.target.files?.[0] || null)}
                required
              />
              {errors.supportingDocument && <span className="error-message">{errors.supportingDocument}</span>}
            </div>

            <div className="form-group">
              <label>Video Link 影片鏈結</label>
              <input
                type="url"
                value={formData.videoLink}
                onChange={(e) => handleInputChange('videoLink', e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>

          {/* Declaration */}
          <div className="form-section">
            <h2>Declaration 聲明</h2>
            
            <div className="declaration-items">
              <div className="declaration-item">
                <input
                  type="checkbox"
                  id="submissionUsage"
                  checked={formData.submissionUsage}
                  onChange={(e) => handleInputChange('submissionUsage', e.target.checked)}
                  required
                />
                <label htmlFor="submissionUsage">
                  <strong>1. About The Submission Usage關於資料用途：*</strong><br/>
                  I/We confirm that the details are accurate and applicable in all promotion materials related to the Awards including website and trophy, etc. If there is any changes need to be made based on the form, I/we have only one chance to change without additional cost. If there is any additional amendment has to be made further to the signed submission usage form, HK$800 will be imposed each time. (For details, please refer to the Terms & Conditions point #6)<br/><br/>
                  本人／我們確認所有與獎項相關的宣傳材料包括網站和印獎座等的詳細資料準確和適用。如果需要對已提交資料進行任何更改，本人／我們只接受一次無需額外費用的修改，其後將收取每次港幣800元正的修改費用。（詳情請參閲推廣活動條款及細則之第六項條款及細則）
                </label>
              </div>

              <div className="declaration-item">
                <input
                  type="checkbox"
                  id="applicationDeclaration"
                  checked={formData.applicationDeclaration}
                  onChange={(e) => handleInputChange('applicationDeclaration', e.target.checked)}
                  required
                />
                <label htmlFor="applicationDeclaration">
                  <strong>2. About The Application關於參賽機構：*</strong><br/>
                  I/We declare that the application is submitted by locally registered entities or residents in Hong Kong.<br/>
                  本人/我們聲明參賽機構為香港註冊公司、機構或香港居民。
                </label>
              </div>

              <div className="form-group">
                <label><strong>3. Please choose either one：請選擇其中一項：*</strong></label>
                <div className="radio-group single-column">
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="no-patent"
                      name="patentStatus"
                      value="no-patent"
                      checked={formData.patentStatus === 'no-patent'}
                      onChange={(e) => handleInputChange('patentStatus', e.target.value)}
                      required
                    />
                    <label htmlFor="no-patent">
                      The submitting entry has not been applied for any patent.<br/>
                      此參賽項目沒有申請任何專利。
                    </label>
                  </div>
                  
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="has-patent"
                      name="patentStatus"
                      value="has-patent"
                      checked={formData.patentStatus === 'has-patent'}
                      onChange={(e) => handleInputChange('patentStatus', e.target.value)}
                      required
                    />
                    <label htmlFor="has-patent">
                      Declaration on patent related information for the submitting entry：<br/>
                      此參賽項目之專利資料列明如下：
                    </label>
                  </div>
                </div>
                {errors.patentStatus && <span className="error-message">{errors.patentStatus}</span>}
              </div>

              <div className="form-group">
                <label><strong>4. Please choose either one：請選擇其中一項：*</strong></label>
                <div className="radio-group single-column">
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="no-dispute"
                      name="intellectualProperty"
                      value="no-dispute"
                      checked={formData.intellectualProperty === 'no-dispute'}
                      onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
                      required
                    />
                    <label htmlFor="no-dispute">
                      I/We declare that there is no dispute in any place over the world over intellectual property right about the submitting entry.<br/>
                      本人／我們在此聲明此參賽項目在世界任何地方沒有任何知識產權爭議。
                    </label>
                  </div>
                  
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="has-dispute"
                      name="intellectualProperty"
                      value="has-dispute"
                      checked={formData.intellectualProperty === 'has-dispute'}
                      onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
                      required
                    />
                    <label htmlFor="has-dispute">
                      I/We declare that there are / were below dispute(s) over intellectual property right about the submitting entry and I/We have obligation to disclose the corresponding information for the Judging Panel to consider the eligibility of the submitting entry.<br/>
                      本人／我們在此聲明此參賽項目有或曾經有以下知識產權爭議，本人／我們須披露有關資料予評審團考慮此參賽項目的參賽資格。
                    </label>
                  </div>
                </div>
                {errors.intellectualProperty && <span className="error-message">{errors.intellectualProperty}</span>}
              </div>

              <div className="declaration-item">
                <input
                  type="checkbox"
                  id="eventAdminCost"
                  checked={formData.eventAdminCost}
                  onChange={(e) => handleInputChange('eventAdminCost', e.target.checked)}
                  required
                />
                <label htmlFor="eventAdminCost">
                  <strong>5. Event Administration Cost 活動行政費用：*</strong><br/>
                  I/We declare that I/we accept the event administration cost, which is HKD$10,000, if awarded under the "Health Partnership Awards 2025". The administration cost includes a trophy, one representative to participate in the Award Presentation Ceremony and all the opportunities for the logo exposures (under the overall event exposures). (For details, please refer to the Terms & Conditions point #7)<br/><br/>
                  本人／我們在此聲明本人／我們明白如於「2025健康同行夥伴大獎」中獲獎需繳付港幣$10,000元正，此行政費包括一個獎座、一名代表參加頒獎典禮以及所有商標活動曝光中的利益機會。（詳情請參閲推廣活動條款及細則之第七項條款及細則）
                </label>
              </div>
            </div>
          </div>

          {/* Verification and Submit */}
          <div className="form-section">
            <div className="verify-section">
              <label>Verify Code</label>
              <div className="verification">
                <span className="captcha">6J149</span>
                <button type="button" className="refresh-btn">驗證碼</button>
                <input
                  type="text"
                  className={errors.verifyCode ? 'error' : ''}
                  value={formData.verifyCode}
                  onChange={(e) => handleInputChange('verifyCode', e.target.value)}
                  placeholder="請輸入驗證碼"
                  required
                />
              </div>
              {errors.verifyCode && <span className="error-message">{errors.verifyCode}</span>}
            </div>
            
            <p className="description">
              Please refresh and use new verification code to re-submit the form if you have submitted application failed before.<br/>
              若曾提交失敗，請於再次提交前刷新圖像並以新驗證碼重新提交其申請。
            </p>

            <div className="submit-section">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting... 提交中...' : 'Submit 遞交'}
              </button>
            </div>

            <p className="description final-note">
              Please note that applicant will receive an auto-reply email after submitting the application successfully.<br/>
              If you don't receive any reply email 3 days after your submission, please contact (+852) 2880 2978 or email whexpo@etnet.com.hk.<br/><br/>
              請注意如成功申請後應會收到一封自動回覆的電子郵件。<br/>
              如閣下在3天内未能收到，請致電 (+852) 2880 2978或電郵聯絡 whexpo@etnet.com.hk。
            </p>
          </div>
        </form>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L6 10L7.41 11.41L11 7.83V20H13V7.83L16.59 11.41L18 10L12 4Z" fill="currentColor"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Form2025; 