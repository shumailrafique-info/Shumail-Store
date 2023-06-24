import "./footer.scss";
import footerimage from "../../images/payment.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <p>
            An e-commerce website is one that allows people to buy and sell
            physical goods, services, and digital products over the internet
            rather than at a brick-and-mortar location.
          </p>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <p>
            An e-commerce website is one that allows people to buy and sell
            physical goods, services, and digital products over the internet
            rather than at a brick-and-mortar location.
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <div className="bottom ">
        <div className="left">
          <span className="logo">ShumailStore</span>
          <span className="copyright">
            &#169; Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right py-6">
          <img src={footerimage} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
