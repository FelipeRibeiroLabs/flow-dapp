import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNFTs } from "../contexts/NftsContext";
import MintOrbieType from "./MintOrbieType";
// import {Modal} from "flow-lib";

const selectedOrbies = {
common: false,
legendary: false,
rare: false,
};

const OrbiesSection = () => {
const { logIn, user, getFlow } = useAuth();
const { Orbies, mintOrbie, IsLoading, getOrbies, setIsLoading, txId, status } = useNFTs();
const [selected, setSelected] = useState(selectedOrbies);

let common =  ["Common Orbie", "The common Orbie", "https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/orbieCommonActive.png", "common", user.addr];
let legendary = ["Legendary Orbie", "The legendary Orbie", "https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/orbieLegendaryActive.png", "legendary", user.addr];
let rare = ["Rare Orbie", "The rare Orbie", "https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/orbieRareActive.png", "rare", user.addr];

  const handleMint = (args) => {
    mintOrbie(args[0], args[1], args[2], args[3], args[4]);
    getOrbies(user.addr);
  }

useEffect(() => {
  handleSelect("common");
}, []);

useEffect(() => {
  getOrbies(user.addr);
  getFlow(user.addr);
}, [Orbies, getOrbies, getFlow, user.addr]);

const handleSelect = (type) => {
  setSelected({ ...selectedOrbies, [type]: !selected.type });
};

return (
  <div className="orbiesSection">
    {/* {IsLoading && <Modal txId={txId}/>} */}
    <div className="orbiesTab">
      <div
        className={selected.common ? "commonTab" : "inactive"}
        onClick={() => handleSelect("common")}
      />
      <div
        className={selected.legendary ? "legendaryTab" : "inactive"}
        onClick={() => handleSelect("legendary")}
      />
      <div
        className={selected.rare ? "rareTab" : "inactive"}
        onClick={() => handleSelect("rare")}
      />
    </div>
    <div className="orbiesContent">
      {!user.addr ? (
        <div className="orbiesText">
          <h2>Welcome</h2>
          <p>Sign up to get your Orbie NFT</p>
          <button onClick={logIn} className="signUpBtn">
            SIGN UP
          </button>
        </div>
      ) : (
        <div>
          {selected.common && 
          <MintOrbieType 
          type="COMMON" 
          description="Mint your Common Orbie NFT"
          price="10"
          mintFn={() => handleMint(common)}
          />
          }
          {selected.legendary &&
          <MintOrbieType 
          type="LEGENDARY" 
          description="Mint your Legendary Orbie NFT"
          price="30"
          mintFn={() => handleMint(legendary)}
          />
          }
          {selected.rare &&
          <MintOrbieType 
          type="RARE" 
          description="Mint your Rare Orbie NFT"
          price="50"
          mintFn={() => handleMint(rare)}
          />
          }
        </div>
      )}
      <div className="orbieImg">
        {selected.common && (
          <img
            src="https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/orbieCommon.png"
            alt=""
          />
        )}
        {selected.legendary && (
          <img
            src="https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/orbieLegendary.png"
            alt=""
          />
        )}
        {selected.rare && (
          <img
            src="https://magic-flow-academy.s3.sa-east-1.amazonaws.com/orbies/orbieRare.png"
            alt=""
          />
        )}
      </div>
    </div>
    <div className="divider"></div>
    <div className="orbies">
      {Orbies.map((orbie, index) => (
        <div key={index} className={user.addr ? "orbie" : "none"}>
          <img src={orbie.thumbnail} alt="" />
        </div>
      ))}
    </div>
  </div>
);
};

export default OrbiesSection;