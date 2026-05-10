let schedule=loadSchdule();
function AddClass(){
    let day=document.getElementById("day").value;
    let subject=document.getElementById("subject").value;
    let start=document.getElementById("start").value;
    let end=document.getElementById("end").value;
    let location=document.getElementById("location").value;
    if(!schedule[day]){
    schedule[day]=[];
    }
    schedule[day].push({subject,start,end,location});
    localStorage.setItem("schedule",JSON.stringify(schedule));
    alert("class added!");
}
function Save(){
       localStorage.setItem("schedule",JSON.stringify(schedule));
       alert("Saved");
}
function loadSchdule(){
    let data=localStorage.getItem("schedule");
    if(data)
    return JSON.parse(data);
    else 
        return{};
}
function Convertmin(time){
    let [h,m]=time.split(":");
    return parseInt(h)*60+parseInt(m);
}
function CurrentClass(){
    let now=new Date();
  let  c_time=now.getHours()*60+now.getMinutes();
    let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let today=days[new Date().getDay()];
   let output='No classes now..';
   if(schedule[today]){
    schedule[today].forEach(i => {
         let start=Convertmin(i.start);
    let end=Convertmin(i.end);
        if(c_time>=start && c_time<=end){
            output=`${i.subject} in ${i.location}`;
        }
    })};
    document.getElementById("output").innerText=output;
}
setInterval(CurrentClass,1000);