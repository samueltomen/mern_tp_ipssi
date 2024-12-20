import "./Account.css";
import UsersAnnonce from "./UsersAnnonce.jsx";

const Account = () => {
  return (
    <div className="account-container container py-4">
      <div className="row">
        {/* En-tête */}
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="account-title">Mon Compte</h1>
          </div>
        </div>
      </div>
      <UsersAnnonce />
    </div>
  );
};

export default Account;
