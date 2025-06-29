import React from "react";
import "./Main.css"

function Main(){ //컴포넌트
  return (
    <div className="mainWrapper">
        <div id="container_head">
          <a className="title">{`ADB-Adopt don't buy\n[사지 말고 입양하세요]`}</a>
        </div>

        <div className="container_body">
          <div className="subtitle radius_15">{`유기동물들의 새로운 가족을 위해`}
            <span role="img" aria-label="dog">🐕</span>
            <span role="img" aria-label="cat">🐈</span>
            <span role="img" aria-label="parrot">🦜</span>
            <span role="img" aria-label="rabbit">🐇</span>
          </div>
          
          <div className="row_flex">
            <span id="midle_img">
              <img src="../resources/image/고성신문 출저.jpg" alt="보호소"  className="radius_15"/>
              <span className="detail_source">{`ⓒ사진출저 : 고성신문-고성군유기동물보호소 두 달, 변화의 시작`}</span>
            </span>
            <div className="column_flex per_50_w">
              <p className="description font_25_vw font_bold">{`모든 동물들은 사랑받을 권리가 있습니다.`}</p>
              <p className="description font_20">{`이러한 권리를 위해 가족을 찾는 유기동물들을 보호하는\n개인,중소규모 유기동물보호소를 소개합니다.`}</p>
            </div>
          </div>
        </div>

        <div className="container_body">
          <div className="subtitle radius_15">등록되어 있는 보호소<span role="img" aria-label="house">🏡</span></div>
          <div className="shelter_list">
            <a className="direction">
              <img src="../resources/image/left-arrow.png" alt="왼쪽이동"/>
            </a>
            
            <ul className="shelter_list">
              <li className="radius_15 list_card">
                <a className="list_card_img">
                  <img src="../resources/image/pet_sheltering_default.png" alt="보호소"/>
                </a>
                <a className="font_20 font_bold">보호소 이름</a>
                <a>보호소 설명</a>
              </li>
              <li className="radius_15 list_card">
                <a className="list_card_img">
                  <img src="../resources/image/pet_sheltering_default.png" alt="보호소"/>
                </a>
                <a className="font_20 font_bold">보호소 이름</a>
                <a>보호소 설명</a>
              </li>
              <li className="radius_15 list_card">
                <a className="list_card_img">
                  <img src="../resources/image/pet_sheltering_default.png" alt="보호소"/>
                </a>
                <a className="font_20 font_bold">보호소 이름</a>
                <a>보호소 설명</a>
              </li>
            </ul>
            <a className="direction">
              <img src="../resources/image/right-arrow.png" alt="오른쪽이동"/>
            </a>
          </div>
        </div>

        <div id="container_footer">
          <div className="detail_source">본 사이트에 이용된 아이콘들은 iconfinder와 flaticon,ICON8에 저작권이 있음을 알려드립니다.</div>
          <div className="detail_source">제작자 @Gongdol_P</div>
        </div>
    </div>
 
  );
}

export default Main;