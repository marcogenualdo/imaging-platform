# Website for the Biology Department of Sapienza University of Rome

The website is available at https://www.imagingplatformibpmcnr.it/

Static site built in [Gatsby](https://www.gatsbyjs.com/) + [Netlify CMS](https://www.netlifycms.org/).

### Host

The website is hosted at [netlify.com](https://www.netlify.com/). Deploys are handled through a CI/CD pipeline hooked to the `master` branch.

### CMS

The content on every page of this website is editable through the `/admin` route by users registered with Netlify identity. Any published change of this content creates a commit on the `master` branch, which triggers a build of the site.

In this repository all editable content is stored in the `content` folder (`content/uploads` for images) using markdown documents.

The CMS's configuration is stored in `static/admin/config.yml`.
