import React, { useEffect, useState } from "react";
import "../Main/Main.css"
import "../registration/registration.css"
import { db } from '../firebase.js';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import SavingList from "../components/savingList.jsx";

function Registration() {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true); //DB호출 완료 체크

    useEffect(() => {
        const shelterList = query(collection(db, 'shelter'),orderBy("id", "desc"));
    
        const unsubscribe = onSnapshot(
          shelterList, (snapshot) => {
            const shelterData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setShelters(shelterData);
            setLoading(false);
          },
          (error) => {
            console.error("실시간 데이터 수신 중 오류:", error);
            setLoading(false);
          }
        );
    
        return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 제거
      }, []);

      
    return (
    <div className="mainWrapper">
        <div id="container_head">
          <a className="title">{`ADB-Adopt don't buy\n[사지 말고 입양하세요]\n데이터관리소`}</a>
        </div>

        <div className="container_body">
            {loading ? <p>Loading...</p> : <SavingList shelters = {shelters}/>}
        </div>
    </div>
    );
}

export default Registration;