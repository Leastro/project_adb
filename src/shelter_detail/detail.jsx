import React, { useEffect, useState } from "react";
import "./detail.css"
import { db } from '../firebase.js';
import { doc, getDoc  } from "firebase/firestore";
import { FaTwitter , FaInstagramSquare } from "react-icons/fa";
import { FaRegCopy, FaChrome } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";


function Detail({shelters, onClose}){
    const [shelter, setShelter] = useState(null);
    const shelterId = shelters;

    useEffect(() => {
        const fetchShelter = async () => {
          const docRef = doc(db, 'shelter', shelterId); // 문서 참조
          const docSnap = await getDoc(docRef); // 문서 가져오기

          if (docSnap.exists()) {
            setShelter({ id: docSnap.id, ...docSnap.data() });
          }
        };

        fetchShelter();
    }, [shelterId]);

    const handleCopy = (copyText) => {
        navigator.clipboard.writeText(copyText);
        alert("복사되었습니다.");
    };
    

    return(
        <div className="overlay">
           {shelter ? (
                <div className="modalPop radius_15">
                    <IoIosCloseCircleOutline onClick={onClose} className="icon_close"/>
                    <span>
                        <p id="shelterName">{shelter.name}</p>
                        <p className="snsList">
                            {shelter.sns_X && <FaTwitter className="icon_sns twitter" style={{color:'blue'}} onClick={() => window.open(shelter.sns_X, '_blank', 'noopener,noreferrer')}/>}
                            {shelter.sns_insta && <FaInstagramSquare className="icon_sns instagram" onClick={() => window.open(shelter.sns_insta, '_blank', 'noopener,noreferrer')}/>}
                            {shelter.site && <FaChrome className="icon_sns chrome" onClick={() => window.open(shelter.site, '_blank', 'noopener,noreferrer')}/>}
                            {shelter.linktree && <SiLinktree className="icon_sns linktree" onClick={() => window.open(shelter.linktree, '_blank', 'noopener,noreferrer')}/>}
                        </p>
                        <p id="BankNum">후원계좌 : {shelter.banknum}
                            &nbsp;<FaRegCopy className="icon_copy" onClick={() => handleCopy(shelter.banknum)}/>
                        </p>
                        <p id="CallNum">대표연락처 : {shelter.callnum}
                            &nbsp;<FaRegCopy className="icon_copy" onClick={() => handleCopy(shelter.callnum)}/>
                        </p>
                        <p>{shelter.description}</p>
                    </span>
                </div>
            ) : (
                <p>불러오는 중...</p>
            )} 
        </div>
    );
}

export default Detail;