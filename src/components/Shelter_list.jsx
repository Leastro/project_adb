import React from "react";
import "../Main/Main.css"
//import InfiniteScroll from 'react-infinite-scroll-component';

function shelter_list({ shelters, onClickItem }){
    console.log(shelters);
    
    return (
        <li>
            <ul className="shelter_list">
                {shelters.map((shelter) => (
                    <li key={shelter.id}
                    className="radius_15 list_card"
                    onClick={() => onClickItem && onClickItem(shelter)}
                    >
                    <a className="list_card_img">
                        <img
                        src={shelter.imageUrl || "../resources/image/pet_sheltering_default.png"}
                        alt="보호소"
                        />
                    </a>
                    <a className="font_20 font_bold">{shelter.name || "보호소 이름"}</a>
                    <a>{shelter.description || "보호소 설명"}</a>
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default shelter_list;