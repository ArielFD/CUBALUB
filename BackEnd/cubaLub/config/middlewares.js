module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
	  name: "strapi::body",
	  config: {
		  formLimit: "100MB",
		  jsonLimit: "100MB",
		  textLimit: "100MB",
		  formidable: {
			  maxFileSize: 200 * 1024 * 1024, //multipart data
		  }
	  }
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
