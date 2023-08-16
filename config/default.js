module.exports = {
  app: {
    port: 3000,
    static_folder: `${__dirname}/../src/public`,
    router: `${__dirname}/../src/routers/web.js`,
    view_folder: `${__dirname}/../src/apps/views`,
    view_engine: "ejs",
    session_key: "vietpro",
    tmp: `${__dirname}/../src/tmp`,
  },
  mail: {
    host: "smtp.gmail.com",
    post: 587,
    secure: false,
    auth: {
      user: "hung.azure34@gmail.com",
      pass: "rzguepdfnyibllod",
    },
  },
};
