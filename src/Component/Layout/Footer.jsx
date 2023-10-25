import React from "react";
import Benompf from "../../assets/Benom_Profile_Logo.png";
const Footer = () => {
  return (
    <footer className=" flex flex-row justify-between items-center p-5 bg-neutral text-neutral-content">
      <div className="items-center flex flex-row">
        <img src={Benompf} alt="" className=" w-[36px] h-[36px] bg-blend-multiply" />
        <p className="ml-1">Benom</p>
      </div>
      <div className="flex flex-row gap-4 md:place-self-center md:justify-self-end">
        <a href="https://twitter.com/?lang=en" alt="twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" alt="Youtube">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
        <a href="https://www.facebook.com/campaign/landing.php?campaign_id=1661666324&extra_1=s%7Cc%7C323129282123%7Ce%7Cfacebook%7C&placement=&creative=323129282123&keyword=facebook&partner_id=googlesem&extra_2=campaignid%3D1661666324%26adgroupid%3D72546442508%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-541132862%26loc_physical_ms%3D9074826%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAjw1t2pBhAFEiwA_-A-NNCxuqWL62hrmYHYVecz_W0rFHq-wf-q9pVnT6DZSC7tNu7YriajlBoCdAAQAvD_BwE" alt="facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
