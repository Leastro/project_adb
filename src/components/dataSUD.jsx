//데이터 저장 삭제 수정 페이지
import React, { useEffect, useState } from "react";
import { db } from '../firebase.js';
import { doc, getDocs, collection, addDoc, query, where, updateDoc, orderBy, limit } from "firebase/firestore";

function DataSUD({ showDetail, shelters }){
    const [shelter, setShelter] = useState(null);
    const [lastId, setLastId] = useState(0);
    const shelterId = shelters; //목록에서 선택한 값

    //신규 혹은 업데이트 저장용
    const [name, setName] = useState("");//이름
    const [bankNum, setBankNum] = useState("");//후원계좌
    const [callNum, setCallNum] = useState("");//대표번호
    const [snsX, setSnsX] = useState("");//트위터
    const [snsInsta, setSnsInsta] = useState("");//인스타
    const [snsLinkT, setSnsLinkT] = useState("");//링크트리
    const [site, setSite] = useState("");//사이트
    const [desc, setDesc] = useState("");//상세설명

    //데이터 선택시
    useEffect(() => {
        if(shelterId != null && shelterId != ""){
            const fetchShelter = async () => {
                const shelterRef = collection(db, "shelter");
                const q = query(shelterRef, where("id", "==", shelterId));

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // 첫 번째 문서
                    const data = { id: doc.id, ...doc.data() };

                    //불러온 데이터 저장
                    setName(data.name);
                    setBankNum(data.bankNum);
                    setCallNum(data.callNum);
                    setSnsX(data.sns_X);
                    setSnsInsta(data.sns_insta);
                    setSnsLinkT(data.linktree);
                    setSite(data.site);
                    setDesc(data.description);
                  } else {
                    console.log("해당 ID의 문서가 없습니다.");
                    setShelter(null);
                  }
                
            };
            
            fetchShelter();
        }
    }, [shelterId]);

    //마지막 id값 
    useEffect(() => {
        const checkLastId = async () => {
            const shelterRef = query(collection(db, 'shelter'),orderBy("id", "desc"), limit(1));
            const querySnapshot = await getDocs(shelterRef);

            if (querySnapshot.empty) {
                return setLastId(1); // 컬렉션이 비어있는 경우
            }
            
            setLastId(parseInt(querySnapshot.docs[0].data().id));
        };
        checkLastId();
    }, []);

    //데이터 업데이트
    const updateData = async (shelterId, updateFields) => {
        const shelterRef = collection(db, "shelter");
        const q = query(shelterRef, where("id", "==", shelterId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert("해당 보호소가 없습니다.");
            return;
        }

        querySnapshot.forEach(async (document) => {
            const docRef = doc(db, "shelter", document.id); // 문서의 Firestore 고유 ID로 참조
        
            // 업데이트 실행
            await updateDoc(docRef, updateFields);

            alert("보호소가 수정되었습니다!");
        });
    }

    //저장버튼 클릭시
    const handleSave = async (e) => {
        //필수값 null 체크
        if(!name) {alert("보호소명을 입력해주세요"); return;}
        else if(!bankNum) {alert("후원계좌를 입력해주세요"); return;}
        else if(!callNum) {alert("대표번호를 입력해주세요"); return;}
        else if(!desc) {alert("상세설명을 입력해주세요"); return;}

        e.preventDefault(); // 폼 제출 시 새로고침 방지

        //기존 데이터 수정 시
        if(shelterId != null && shelterId != ""){
            updateData(shelterId, {
                name: name,
                bankNum: bankNum,
                callNum: callNum,
                sns_X: snsX,
                sns_insta: snsInsta,
                linktree: snsLinkT,
                site: site,
                description: desc
            });
        }else{
            //데이터 신규 추가
            try {
                await addDoc(collection(db, 'shelter'), {
                    id: String(lastId + 1).padStart(4, "0"),
                    name: name,
                    bankNum: bankNum,
                    callNum: callNum,
                    sns_X: snsX,
                    sns_insta: snsInsta,
                    linktree: snsLinkT,
                    site: site,
                    description: desc
                });
                alert("보호소가 등록되었습니다!");
    
                setName("");
                setBankNum("");
                setCallNum("");
                setSnsX("");
                setSnsInsta("");
                setSnsLinkT("");
                setSite("");
                setDesc("");
                showDetail();
            }catch (error) {
                console.error("등록 중 오류:", error);
                alert("등록에 실패했습니다.");
            }
        }
    };

    //데이터 삭제
    const deleteData = () => {

    };

    return(
        <div className="showDetail">
            <table className="detail">
                <colgroup>
                    <col width={"130px"} />
                    <col width={"300px"} />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <span className="color_red">*</span><span className="indexCol">보호소명 : </span>
                        </td>
                        <td>
                            <input type="text" className="name" value={name} onChange={(e) =>setName(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="color_red">*</span><span className="indexCol">후원계좌 : </span>
                        </td>
                        <td>
                            <input type="text" className="bankNum" value={bankNum} onChange={(e) =>setBankNum(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="color_red">*</span><span className="indexCol">대표번호 : </span>
                        </td>
                        <td>
                            <input type="text" className="callNum" value={callNum} onChange={(e) =>setCallNum(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="indexCol">트위터 주소 : </span>
                        </td>
                        <td>
                            <input type="text" className="sns_X" value={snsX} onChange={(e) =>setSnsX(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="indexCol">인스타 주소 : </span>
                        </td>
                        <td>
                            <input type="text" className="sns_insta" value={snsInsta} onChange={(e) =>setSnsInsta(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="indexCol">링크트리 주소 : </span>
                        </td>
                        <td>
                            <input type="text" className="linktree" value={snsLinkT} onChange={(e) =>setSnsLinkT(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="indexCol">사이트 : </span>
                        </td>
                        <td>
                            <input type="text" className="site" value={site} onChange={(e) =>setSite(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="color_red">*</span>상세 설명 :
                        </td>
                        <td>
                        <textarea type="text" className="description" style={{width:"94%"}} 
                               value={desc} onChange={(e) =>setDesc(e.target.value)}></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="delBtn" onClick={deleteData}>삭제</button>
            <button className="saveBtn" onClick={handleSave}>저장</button>
            <button className="clsBtn" onClick={showDetail}>닫기</button>
        </div>
    )
}

export default DataSUD;