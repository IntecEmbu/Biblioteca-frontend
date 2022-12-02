import React from 'react'
import "../../styles/Sobre.css";

function Index(props) {

  return (
    <div className="yyyy">
      {props.position ? (
        <div className="container-sobre">
        <div className="sobre-img">
          {props.img}
        </div>
        <div className="sobre-texto">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi purus nibh, egestas a vestibulum sit amet, rhoncus nec diam. Donec blandit faucibus quam, quis laoreet quam maximus in. Morbi et sapien odio. Suspendisse id nibh gravida justo bibendum sodales. Etiam commodo id enim a faucibus. Donec vehicula, magna eget fermentum rutrum, eros purus consequat risus, eu consectetur elit est ac risus. Proin erat ex, ullamcorper at justo eget, tincidunt egestas est. Nam eu pharetra nulla, sit amet molestie tellus. Cras pulvinar quam vitae euismod sollicitudin.
          </p>
        </div>
      </div>
      ) : (
        <div className="container-sobre">
        <div className="sobre-texto">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi purus nibh, egestas a vestibulum sit amet, rhoncus nec diam. Donec blandit faucibus quam, quis laoreet quam maximus in. Morbi et sapien odio. Suspendisse id nibh gravida justo bibendum sodales. Etiam commodo id enim a faucibus. Donec vehicula, magna eget fermentum rutrum, eros purus consequat risus, eu consectetur elit est ac risus. Proin erat ex, ullamcorper at justo eget, tincidunt egestas est. Nam eu phare
          </p>
        </div>
        <div className="sobre-img">
          {props.img}
        </div>
      </div>
      )}
    </div>
  );
}

export default Index;