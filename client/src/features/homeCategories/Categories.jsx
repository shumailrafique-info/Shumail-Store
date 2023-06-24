import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = () => {
  return (
    <>
      <hr />
      <p className="text-center text-3xl font-bold m-6">Best Categories</p>
      <hr />
      <div className="categories">
        <div className="col">
          <div className="row">
            <img
              src="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
              alt=""
            />
            <button>
              <Link to={"/product/1"} className="link">
                Sale
              </Link>
            </button>
          </div>
          <div className="row">
            <img
              src="https://plus.unsplash.com/premium_photo-1663097421630-a9dd4d2b1bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V29tZW4lMjBjbG90aGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <button>
              <Link to={"/product/2"} className="link">
                Women
              </Link>
            </button>
          </div>
        </div>

        <div className="col">
          <div className="row">
            <img
              src="https://images.unsplash.com/photo-1533898301026-0a2546b285e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJveSUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <button>
              <Link to={"/product/1"} className="link">
                New Season
              </Link>
            </button>
          </div>
        </div>

        <div className="col col-l">
          <div className="row">
            <div className="col">
              <div className="row">
                <img
                  src="https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <button>
                  <Link to={"/product/1"} className="link">
                    Men
                  </Link>
                </button>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <img
                  src="https://images.unsplash.com/photo-1506169894395-36397e4aaee4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFjY2Vzc29yaWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt=""
                />
                <button>
                  <Link to={"/product/1"} className="link">
                    Accessories
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <img
              src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1779&q=80"
              alt=""
            />
            <button>
              <Link to={"/product/1"} className="link">
                Shoes
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
