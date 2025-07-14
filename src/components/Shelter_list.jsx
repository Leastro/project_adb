import React from "react";
import "../Main/Main.css"
//import InfiniteScroll from 'react-infinite-scroll-component';

function ShelterList({ shelters, mobi, onClickItem }){
    const sheltersArray = [];

    //입력한 보호소 정보를 4개씩 묶기.
    //[[0,1,2,3],[4,5]] 형식으로 된다.
    //3개씩 묶고 나서 또 묶어야 하기 때문에 증감에 4을 더한다.
    for(var i=0 ; i< shelters.length ; i+=4){
        sheltersArray.push(shelters.slice(i, i + 4));
    }
    
    return (
        <li>
            {sheltersArray.map((index) => (
                <ul className="shelter_list">
                    {index.map((shelter) => (
                        <li key={shelter.id}
                        className="radius_15 list_card"
                        onClick={() => onClickItem && onClickItem(shelter.id)}>
                            <a className="list_card_img">
                                <img src={"../resources/image/pet_sheltering_default.png"} alt="보호소" />
                            </a>
                            <a className={mobi ? 'font_2_vw font_bold shelterNm' : 'font_20 font_bold'}>{shelter.name || "보호소 이름"}</a>
                            <a className="descOver">{shelter.description || "보호소 설명"}</a>
                        </li>
                    ))}
                </ul>
            ))}
        </li>
    );
}

export default ShelterList;