import React, {useEffect, useState} from 'react'
import Cards from '../components/Cards/Cards'
import InputGroup from '../components/Filters/Category/InputGroup';


const Location = () => {


  let [id, setId] = useState(1);
  let [results, setResults] = useState([]);
  
  let [info, setInfo] = useState([]);
  let {name, type, dimension}= info;


  console.log(info)
  let api = `https://rickandmortyapi.com/api/location/${id}`;




  useEffect(() => {
    
    (async function (params) {
      let data = await fetch(api)
        .then(res=>res.json());
        setInfo(data)


      let a = await Promise.all(
        data.residents.map(resident =>{
          return fetch(resident)
            .then(res=>res.json())
       })
      );


      setResults(a);


    })()

  }, [api])
  




  return (
    <div className="container">

      <div className="row mb-4">

        <h1 className="text-center mb-4">
          Location: {" "} 
          <span className="text-primary">
            {name===""? "Unknown" : name} 
          </span>
        </h1>

        <h5 className="text-center mb-3">
          Dimension: {dimension===""? "Unknown" : dimension} 
        </h5>

        <h6 className="text-center">
          Type: {type===""? "Unknown" : type} 
        </h6>
      </div>




      <div className="row">


        <div className="col-lg-3 col-12">
          <h4 className="text-center mb-4">
            Pick location
          </h4>

          <InputGroup setId={setId} name="Location" total={126}/>
        </div>


        <div className="col-lg-8 col-12">

          <div className="row">
            <Cards page="/location/" results={results}/>
          </div>

        </div>


      </div>



    </div>
  )
}

export default Location