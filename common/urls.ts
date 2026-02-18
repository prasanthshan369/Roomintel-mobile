const LIVE = true;

const SITEURL = 'https://bookadzonebackend.onrender.com/';
const LIVEURL = LIVE ? SITEURL : 'http://localhost:8000/';
const ROOTURL = `${LIVEURL}api/v1/`;
const FILEURL = LIVEURL;
const SETTINGS_ID = '68ad8844bfdf0cec7f623bc2';


const API = {
  // Agency endpoints
  addAgency: `${ROOTURL}agencies/`,
  listAgency: `${ROOTURL}agencies/`,
  checkmail: `${ROOTURL}agencies/check-emails`,
  getAgency: `${ROOTURL}agencies/`,
  updateAgency: `${ROOTURL}agencies/`,
  deleteAgency: `${ROOTURL}agencies/softDelete/`,
  toggleStatusAgency: `${ROOTURL}agencies/toggleStatus/`,
  trashAgencyList: `${ROOTURL}agencies/trash`,
  restoreAgency: `${ROOTURL}agencies/restore/`,
  permanentDeleteAgency: `${ROOTURL}agencies/permanentDelete/`,
  //customer endpoints

  listCustomer: `${ROOTURL}customer/`,
  // FAQ endpoints
  addfaq: `${ROOTURL}faqs/`,
  listfaq: `${ROOTURL}faqs/`,
  getFaq: `${ROOTURL}faqs/getFaqById/`,
  updatefaq: `${ROOTURL}faqs/updateFaq/`,
  deletefaq: `${ROOTURL}faqs/softDeleteFaq/`,
  toggleStatusfaq: `${ROOTURL}faqs/togglestatus/`,
  trashfaqlist: `${ROOTURL}faqs/trash`,
  restorefaq: `${ROOTURL}faqs/restore/`,
  permanentDeletefaq: `${ROOTURL}faqs/permanentDelete/`,

  // GalleryCategory endpoint
  addGalleryCategory: `${ROOTURL}galleryCategory/`,
  listGalleryCategory: `${ROOTURL}galleryCategory/`,
  getGalleryCategory: `${ROOTURL}galleryCategory/getGalleryCategoryById/`,
  updateGalleryCategory: `${ROOTURL}galleryCategory/updateGalleryCategory/`,
  deleteGalleryCategory: `${ROOTURL}galleryCategory/softDeleteGalleryCategory/`,
  toggleStatusGalleryCategory: `${ROOTURL}galleryCategory/togglestatus/`,
  trashGalleryCategorylist: `${ROOTURL}galleryCategory/trash`,
  restoreGalleryCategory: `${ROOTURL}galleryCategory/restore/`,
  permanentDeleteGalleryCategory: `${ROOTURL}galleryCategory/permanentDelete/`,

  // Hotel Location endpoints
  addHotelLocation: `${ROOTURL}hotelLocation/`,
  listHotelLocation: `${ROOTURL}hotelLocation/`,
  getHotelLocation: `${ROOTURL}hotelLocation/getHotelLocationById/`,
  updateHotelLocation: `${ROOTURL}hotelLocation/updateHotelLocation/`,
  deleteHotelLocation: `${ROOTURL}hotelLocation/softDeleteHotelLocation/`,
  toggleStatusHotelLocation: `${ROOTURL}hotelLocation/togglestatus/`,
  trashHotelLocationlist: `${ROOTURL}hotelLocation/trash`,
  restoreHotelLocation: `${ROOTURL}hotelLocation/restore/`,
  permanentDeleteHotelLocation: `${ROOTURL}hotelLocation/permanentDelete/`,


  //notified User endpoints
  listNotifiedUsers: `${ROOTURL}notifyuser/`,
  getNotifiedUserById: `${ROOTURL}notifyuser/getnotifyUserById/`,
  deleteNotifiedUser: `${ROOTURL}notifyuser/`,

  // User endpoints
  addUser: `${ROOTURL}users/`,
  listUsers: `${ROOTURL}users/`,
  getUser: `${ROOTURL}users/getUserById/`,
  updateUser: `${ROOTURL}users/updateUser/`,
  deleteUser: `${ROOTURL}users/softDeleteUser/`,
  toggleStatusUser: `${ROOTURL}users/togglestatus/`,
  trashUserList: `${ROOTURL}users/trash`,
  restoreUser: `${ROOTURL}users/restore/`,
  permanentDeleteUser: `${ROOTURL}users/permanentDelete/`,
  // NewsLetter endpoints
  addNewsLetter: `${ROOTURL}newsletters/`,
  listNewsLetter: `${ROOTURL}newsLetters/`,
  getNewsLetter: `${ROOTURL}newsletters/getNewsLetterById/`,
  updateNewsLetter: `${ROOTURL}newsletters/updateNewsLetter/`,
  deleteNewsLetter: `${ROOTURL}newsletters/softDeleteNewsLetter/`,
  toggleStatusNewsLetter: `${ROOTURL}newsletters/togglestatus/`,
  trashNewsLetterList: `${ROOTURL}newsletters/trash`,
  restoreNewsLetter: `${ROOTURL}newsletters/restore/`,
  permanentDeleteNewsLetter: `${ROOTURL}newsletters/permanentDelete/`,

  // Footer endpoints
  addfooterinfo: `${ROOTURL}footerinfo/`,
  listfooterinfo: `${ROOTURL}footerinfo/`,
  getfooterinfobyid: `${ROOTURL}footerinfo/getfooterinfoById/`,
  updatefooterinfo: `${ROOTURL}footerinfo/updatefooterinfo/`,
  deletefooterinfo: `${ROOTURL}footerinfo/softDeletefooterinfo/`,
  toggleStatusfooterinfo: `${ROOTURL}footerinfo/togglestatus/`,
  trashfooterinfolist: `${ROOTURL}footerinfo/trash`,
  restorefooterinfo: `${ROOTURL}footerinfo/restore/`,
  permanentDeletefooterinfo: `${ROOTURL}footerinfo/permanentDelete/`,
  // service endpoints
  addservice: `${ROOTURL}services/`,
  listservice: `${ROOTURL}services/`,
  getservicebyid: `${ROOTURL}services/getserviceById/`,
  updateservice: `${ROOTURL}services/updateservice/`,
  deleteservice: `${ROOTURL}services/softDeleteservice/`,
  toggleStatusservice: `${ROOTURL}services/togglestatus/`,
  trashservicelist: `${ROOTURL}services/trash`,
  restoreservice: `${ROOTURL}services/restore/`,
  permanentDeleteservice: `${ROOTURL}services/permanentDelete/`,
  // amenity endpoints
  addamenity: `${ROOTURL}amenities/`,
  listamenity: `${ROOTURL}amenities/`,
  getamenitybyid: `${ROOTURL}amenities/getamenityById/`,
  updateamenity: `${ROOTURL}amenities/updateamenity/`,
  deleteamenity: `${ROOTURL}amenities/softDeleteamenity/`,
  toggleStatusamenity: `${ROOTURL}amenities/togglestatus/`,
  trashamenitylist: `${ROOTURL}amenities/trash`,
  restoreamenity: `${ROOTURL}amenities/restore/`,
  permanentDeleteamenity: `${ROOTURL}amenities/permanentDelete/`,

  // gallery endpoint
  addGallery: `${ROOTURL}gallery/`,
  listGallery: `${ROOTURL}gallery/`,
  getGallerybyid: `${ROOTURL}gallery/getgalleryById/`,
  updateGallery: `${ROOTURL}gallery/updategallery/`,
  deleteGallery: `${ROOTURL}gallery/softDeletegallery/`,
  toggleStatusGallery: `${ROOTURL}gallery/togglestatus/`,
  trashGallerylist: `${ROOTURL}gallery/trash`,
  restoreGallery: `${ROOTURL}gallery/restore/`,
  permanentDeleteGallery: `${ROOTURL}gallery/permanentDelete/`,

  // BillingAddress endpoints
addBillingAddress: `${ROOTURL}billingaddress/`,
  listBillingAddress: `${ROOTURL}billingaddress/`,
  getBillingAddressByCustomer: `${ROOTURL}billingaddress/getByCustomer/`,
  updateBillingAddress: `${ROOTURL}billingaddress/update/`,
  softDeleteBillingAddress: `${ROOTURL}billingaddress/softDelete/`,
  trashBillingAddressList: `${ROOTURL}billingaddress/trash`,
  restoreBillingAddress: `${ROOTURL}billingaddress/restore/`,
  permanentDeleteBillingAddress: `${ROOTURL}billingaddress/permanentDelete/`,
setDefaultBillingAddress: `${ROOTURL}billingaddress/setDefault/`,


  // slider endpoints
  addslider: `${ROOTURL}slider/`,
  listslider: `${ROOTURL}slider/`,
  getsliderbyid: `${ROOTURL}slider/getsliderById/`,
  updateslider: `${ROOTURL}slider/updateslider/`,
  deleteslider: `${ROOTURL}slider/softDeleteslider/`,
  toggleStatusslider: `${ROOTURL}slider/togglestatus/`,
  trashsliderlist: `${ROOTURL}slider/trash`,
  restoreslider: `${ROOTURL}slider/restore/`,
  permanentDeleteslider: `${ROOTURL}slider/permanentDelete/`,
  reorderslider: `${ROOTURL}slider/reorder`,
  //Testimonial endpoints

  addTestimonial: `${ROOTURL}testimonial/`,
  listTestimonial: `${ROOTURL}testimonial/`,
  getTestimonialbyid: `${ROOTURL}testimonial/getTestimonialById/`,
  updateTestimonial: `${ROOTURL}testimonial/updateTestimonial/`,
  deleteTestimonial: `${ROOTURL}testimonial/softDeleteTestimonial/`,
  toggleStatusTestimonial: `${ROOTURL}testimonial/togglestatus/`,
  trashTestimoniallist: `${ROOTURL}testimonial/trash`,
  restoreTestimonial: `${ROOTURL}testimonial/restore/`,
  permanentDeleteTestimonial: `${ROOTURL}testimonial/permanentDelete/`,


  // Config endpoints
  addconfig: `${ROOTURL}configs/`,
  listconfig: `${ROOTURL}configs/`,
  getConfig: `${ROOTURL}configs/getConfigById/`,
  updateconfig: `${ROOTURL}configs/updateConfig/`,
  deleteconfig: `${ROOTURL}configs/softDeleteConfig/`,
  toggleStatusconfig: `${ROOTURL}configs/togglestatus/`,
  trashconfiglist: `${ROOTURL}configs/trash`,
  restoreconfig: `${ROOTURL}configs/restore/`,
  permanentDeleteconfig: `${ROOTURL}configs/permanentDelete/`,
  pagesConfig: `${ROOTURL}configs/pages`,
  accomodationConfig: `${ROOTURL}configs/accomodation`,
  // User endpoints
  adduserrole: `${ROOTURL}userrole/`,
  createprivilegetable: `${ROOTURL}userrole/createprivilegetable`,
  listuserrole: `${ROOTURL}userrole/listuserrole`,
  fetchMenus: `${ROOTURL}userrole/fetchmenus`,
  getuserrole: `${ROOTURL}userrole/getuserroleById/`,
  updateuserrole: `${ROOTURL}userrole/updateuserrole/`,
  deleteuserrole: `${ROOTURL}userrole/softDeleteuserrole/`,
  toggleStatususerrole: `${ROOTURL}userrole/togglestatus/`,
  trashuserrolelist: `${ROOTURL}userrole/trash`,
  restoreuserrole: `${ROOTURL}userrole/restore/`,
  permanentDeleteuserrole: `${ROOTURL}userrole/permanentDelete/`,

  //agencyprofile endpoints
  updateagencyprofile: `${ROOTURL}agencyprofile/updateagencyProfile/`,
  updatedocument: `${ROOTURL}agencyprofile/updatedocument/`,
  getagencyprofile: `${ROOTURL}agencyprofile/getagencyprofile`,
  // Category endpoints
  addcategory: `${ROOTURL}category/`,
  listcategory: `${ROOTURL}category/`,
  getAllCategories: `${ROOTURL}category/all`,
  getcategorybyId: `${ROOTURL}category/getcategoryById/`,  // Make sure this matches the backend route
  updatecategory: `${ROOTURL}category/updatecategory/`,
  deletecategory: `${ROOTURL}category/softDeletecategory/`,
  toggleStatuscategory: `${ROOTURL}category/togglestatus/`,  // Fix casing to match backend
  trashcategorylist: `${ROOTURL}category/trash`,  // Remove trailing slash
  restorecategory: `${ROOTURL}category/restore/`,
  permanentDeletecategory: `${ROOTURL}category/permanentDelete/`,

  //Banner Management endpoints
  getBanner: `${ROOTURL}banners/`,
  updateBanner: `${ROOTURL}banners/`,

  // Auth endpoints
  login: `${ROOTURL}auth/login`,
  refresh: `${ROOTURL}auth/refresh`,
  forgotPassword: `${ROOTURL}auth/forgot-password`,
  resetPassword: `${ROOTURL}auth/reset-password`,
  me: `${ROOTURL}auth/me`,


  // Page endpoints
  addPage: `${ROOTURL}pages/`,
  listPage: `${ROOTURL}pages/`,
  getPage: `${ROOTURL}pages/getPageById/`,
  updatePage: `${ROOTURL}pages/updatePage/`,
  deletePage: `${ROOTURL}pages/softDeletePage/`,
  toggleStatusPage: `${ROOTURL}pages/togglestatus/`,
  trashPageList: `${ROOTURL}pages/trash`,
  restorePage: `${ROOTURL}pages/restore/`,
  permanentDeletePage: `${ROOTURL}pages/permanentDelete/`,

  //Accomodation

  addAccomodation: `${ROOTURL}accomodation/`,
  listAccomodation: `${ROOTURL}accomodation/`,
  getAccomodation: `${ROOTURL}accomodation/getAccomodationById/`,
  updateAccomodation: `${ROOTURL}accomodation/updateAccomodation/`,
  deleteAccomodation: `${ROOTURL}accomodation/softDeleteAccomodation/`,
  toggleStatusAccomodation: `${ROOTURL}accomodation/togglestatus/`,
  trashAccomodationList: `${ROOTURL}accomodation/trash`,
  restoreAccomodation: `${ROOTURL}accomodation/restore/`,
  permanentDeleteAccomodation: `${ROOTURL}accomodation/permanentDelete/`,

  //BlogCategory endpoints
  addBlogCategory: `${ROOTURL}blogCategory/`,
  listBlogCategory: `${ROOTURL}blogCategory/`,
  getBlogCategory: `${ROOTURL}blogCategory/getblogCategoryById/`,
  updateBlogCategory: `${ROOTURL}blogCategory/updateblogCategory/`,
  deleteBlogCategory: `${ROOTURL}blogCategory/softDeleteblogCategory/`,
  toggleStatusBlogCategory: `${ROOTURL}blogCategory/togglestatus/`,
  trashBlogCategoryList: `${ROOTURL}blogCategory/trash`,
  restoreBlogCategory: `${ROOTURL}blogCategory/restore/`,
  permanentDeleteBlogCategory: `${ROOTURL}blogCategory/permanentDelete/`,

  // Profile endpoints
  profile: {
    me: `${ROOTURL}auth/me`,
    update: `${ROOTURL}auth/profile`,
    changePassword: `${ROOTURL}auth/change-password`
  },


  // Property endpoints
  addProperty: `${ROOTURL}properties/`,
  listProperty: `${ROOTURL}properties/`,
  getProperty: `${ROOTURL}properties/`,
  updateProperty: `${ROOTURL}properties/`,
  deleteProperty: `${ROOTURL}properties/softDelete/`,
  toggleStatusProperty: `${ROOTURL}properties/toggleStatus/`,
  trashPropertyList: `${ROOTURL}properties/trash`,
  restoreProperty: `${ROOTURL}properties/restore/`,
  permanentDeleteProperty: `${ROOTURL}properties/permanentDelete/`,
  propertyConfig: `${ROOTURL}configs/properties`,

  // Template Images
  templateImage: `${ROOTURL}editer/image`,

  // Booking endpoints
  listBooking: `${ROOTURL}bookings`,
  getBookingById: `${ROOTURL}bookings/`,
  bookingCount: `${ROOTURL}bookings/count`,
  checkoutBooking: (id: string) => `${ROOTURL}bookings/${id}/checkout`,


  // Review endpoints
  listReview: `${ROOTURL}review`,
  updateReviewStatus: `${ROOTURL}review`,

  // Room endpoints
  rooms: `${ROOTURL}rooms/`,
  roomBanner: `${ROOTURL}rooms/banner`,
  toggleStatusRoom: `${ROOTURL}rooms/toggleStatus/`,

  // Landmark endpoints
  landmarks: `${ROOTURL}landmarks/`,
  toggleStatusLandmark: `${ROOTURL}landmarks/toggleStatus/`,

  // Promo Code endpoints
  promoCodes: `${ROOTURL}promo-codes`,

  // Layout Builder endpoints
  layoutBuilder: `${ROOTURL}layout-builder/`,
  reorderLayoutBuilder: `${ROOTURL}layout-builder/reorder`,

  // Booking endpoints
  bookings: `${ROOTURL}bookings/`,
  listEnquiry: `${ROOTURL}site/contact/`,

  // Dashboard endpoints
  dashboardStats: `${ROOTURL}dashboard/stats`,
};


const ImportedURL = { API, LIVEURL, FILEURL, SETTINGS_ID, ROOTURL };
export default ImportedURL;
