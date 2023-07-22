// import { useEffect } from "react";
// import "./featuredInfo.css";
// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
// import { userRequest } from "../../requestMethods"
// import { useState } from "react";

// export default function FeaturedInfo() {

//   const [income,setIncome] = useState([])
//   const [perc,setPerc] = useState([])

//   useEffect(()=>{
//     const getIncome = async () => {
//       try{
//         const res = await userRequest("orders/income")
//         setIncome(res.data)
//         console.log(income)
//         setPerc((res.data[1].total*100)/res.data[0].total-100)
//       }catch(err){}
//     }
//     getIncome()
//   },[])

//   return (
//     <div className="featured">
//       <div className="featuredItem">
//         <span className="featuredTitle">Revanue</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">${income[1].total}</span>
//           <span className="featuredMoneyRate">
//             %{Math.floor(perc)}{" "}
//             {perc<0?(
//               <ArrowDownward  className="featuredIcon negative"/>
//             ): (<ArrowUpward className="featuredIcon"/>) }
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//       <div className="featuredItem">
//         <span className="featuredTitle">Sales</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$4,415</span>
//           <span className="featuredMoneyRate">
//             -1.4 <ArrowDownward className="featuredIcon negative"/>
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//       <div className="featuredItem">
//         <span className="featuredTitle">Cost</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$2,225</span>
//           <span className="featuredMoneyRate">
//             +2.4 <ArrowUpward className="featuredIcon"/>
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        // console.log(res.data.length)
        if (res.data.length > 1) {
          const percentage = ((res.data[1].total * 100) / res.data[0].total) - 100;
          setPerc(Math.floor(percentage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          {income.length > 1 ? (
            <>
              <span className="featuredMoney">${income[1].total}</span>
              <span className="featuredMoneyRate">
                %{perc}{" "}
                {perc < 0 ? (
                  <ArrowDownward className="featuredIcon negative" />
                ) : (
                  <ArrowUpward className="featuredIcon" />
                )}
              </span>
            </>
          ) : (
            <span className="featuredMoney">Loading...</span>
          )}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
  
          }