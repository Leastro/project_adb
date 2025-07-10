import React, { useEffect, useState } from "react";
import "./detail.css"
import { db } from '../firebase.js';
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { FaTwitter , FaInstagramSquare } from "react-icons/fa";
import { FaRegCopy, FaChrome } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SiLinktree } from "react-icons/si";


function Detail({shelters, onClose}){
    const [shelter, setShelter] = useState(null);
    const [closing, setClosing] = useState(false);
    const shelterId = shelters;

    useEffect(() => {
        const fetchShelter = async () => {
            const shelterRef = collection(db, "shelter");
            const q = query(shelterRef, where("id", "==", shelterId));

            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0]; // 첫 번째 문서
                const data = { id: doc.id, ...doc.data() };
                console.log(data);
                setShelter(data);
            }
        };

        fetchShelter();
    }, [shelterId]);

    const handleCopy = (copyText) => {
        navigator.clipboard.writeText(copyText);
        alert("복사되었습니다.");
    };

    const handleClose = () => {
        setClosing(true); // 닫기 애니메이션 실행
        setTimeout(() => {
          onClose();       // Main에서 받은 닫기 함수 호출
          setClosing(false); // 상태 초기화
        }, 300); // 애니메이션 지속 시간과 동일
      };

    return(
        <div className="overlay">
           {shelter ? (
                <div className={`modalPop radius_15 ${closing ? "closing" : ""}`}>
                    <IoIosCloseCircleOutline onClick={handleClose} className="icon_close"/>
                    <span>
                        <p id="shelterName">{shelter.name}</p>
                        <p className="snsList">
                            {shelter.sns_X && <FaTwitter className="icon_sns twitter" style={{color:'blue'}} onClick={() => window.open(shelter.sns_X, '_blank', 'noopener,noreferrer')}/>}
                            {shelter.sns_insta && <FaInstagramSquare className="icon_sns instagram" onClick={() => window.open(shelter.sns_insta, '_blank', 'noopener,noreferrer')}/>}
                            {shelter.site && <FaChrome className="icon_sns chrome" onClick={() => window.open(shelter.site, '_blank', 'noopener,noreferrer')}/>}
                            {shelter.linktree && <SiLinktree className="icon_sns linktree" onClick={() => window.open(shelter.linktree, '_blank', 'noopener,noreferrer')}/>}
                        </p>
                        <p id="BankNum">후원계좌 : {shelter.bankNum}
                            &nbsp;<FaRegCopy className="icon_copy" onClick={() => handleCopy(shelter.bankNum)}/>
                        </p>
                        <p id="CallNum">대표연락처 : {shelter.callNum}
                            &nbsp;<FaRegCopy className="icon_copy" onClick={() => handleCopy(shelter.callNum)}/>
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