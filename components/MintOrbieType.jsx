const MintOrbieType = ({type, description, price, mintFn}) => {

    return (
        <div className="orbiesText">
        <h2>{type}</h2>
        <p>{description}</p>
        <p>{price} FLOW</p>
        <button onClick={mintFn}>BUY</button>
        </div>
    );
};

export default MintOrbieType;