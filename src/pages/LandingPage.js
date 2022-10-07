import React from "react";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div id="landing-page">
      <div className="podio-area">
        <span className="podio-title">Leitores do mês</span>
        <div className="podio-container">
          <div className="podio">
            <div className="podio-item">
              <p className="podio-item-name">Pedro F.</p>
              <div id="podio-item-3">3</div>
            </div>
          </div>
          <div className="podio">
            <div className="podio-item">
              <p className="podio-item-name">Natan B.</p>
              <div id="podio-item-1">1</div>
            </div>
          </div>
          <div className="podio">
            <div className="podio-item">
              <p className="podio-item-name">João F.</p>
              <div id="podio-item-2">2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
