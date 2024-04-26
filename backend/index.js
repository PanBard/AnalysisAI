import express from 'express';
import { json } from 'express';

import { createPool } from 'mysql'
import bodyParser from 'body-parser'
import cors from 'cors'
import { API_QUERY } from './api_query.js'
import { API_ROUTS } from './api_routs.js'

const HOST ='mysql_db'
const USER ='api_user'
const PASSWORD ='password'
const DATABASE = 'analysisai_db'



const db = createPool({    
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})


const app = express()
const numer_portu = 4001

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())
app.use(json())
app.use (bodyParser.urlencoded({extended: true})) // zeby cos chodzilo


app.get("/", (req,res)=>{ //req - require , res - response
    res.send("Serwer testowy działający na porcie:"+numer_portu+"działa!!!");
})


app.listen(numer_portu, ()=>{
    console.log(" Najsik - server (TESTOWY_BAZY_DANYCH) jedzie na porcie:",numer_portu)
})











// ###################### ULT_ANALYSIS start ############################

//get all
app.get(API_ROUTS.cation_analysis_result.get, (req,res)=>{  
    db.query(API_QUERY.cation_analysis_result.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu cation_analysis_result');})
    });

// insert image
app.post(API_ROUTS.cation_analysis_result.post, (req,res)=>{
    const id = req.body.id 
    const name = req.body.name
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const f5 = req.body.f5
    const f6 = req.body.f6
    const f7 = req.body.f7
    const img1 = req.body.img1
    const img2 = req.body.img2
    const img3 = req.body.img3
    const img4 = req.body.img4
    const img5 = req.body.img5
    const img6 = req.body.img6
    const img7 = req.body.img7
    const end = req.body.end
    const user_id = req.body.user_id
    const SQL_QUERY =  API_QUERY.cation_analysis_result.add;
    db.query(SQL_QUERY, [id,name,f1,f2,f3,f4,f5,f6,f7,img1,img2,img3,img4,img5,img6,img7,end,user_id], (err,result)=>{
        if (result) {console.log('INSERT STATUS:',result.serverStatus);res.send(`inserted item - id: ${id}`)}
        if (err) console.log('prolemos przy post cation_analysis_result: ',err.sqlMessage)})
    }); 


 // update
 app.put(API_ROUTS.cation_analysis_result.put, (req,res)=>{
    
    const id = req.body.id 
    const name = req.body.name
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const f5 = req.body.f5
    const f6 = req.body.f6
    const f7 = req.body.f7
    const img1 = req.body.img1
    const img2 = req.body.img2
    const img3 = req.body.img3
    const img4 = req.body.img4
    const img5 = req.body.img5
    const img6 = req.body.img6
    const img7 = req.body.img7
    const end = req.body.end
    const LABELS = [name,f1,f2,f3,f4,f5,f6,f7,img1,img2,img3,img4,img5,img6,img7,end]
    const q = ['name','f1',"f2","f3",'f4','f5','f6','f7','img1','img2','img3','img4','img5','img6','img7','end']
    let not_null_array = []
    let current_set=''
    LABELS.map((lab,index)=>{
        if(typeof lab !== 'undefined') {not_null_array.push(lab); current_set=current_set+q[index]+'=?,'}
    })
    const ero = current_set.substring(0, current_set.length - 1);
    not_null_array.push(id) 
    let CUSTOM_QUERY=`UPDATE cation_analysis_result SET ${ero} WHERE id=?`;
    console.log('customquery',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY, not_null_array, (err, result)=>{
        if (result) {console.log('PUT STATUS:',result.serverStatus);res.send(`PUT item - id: ${id}`)}
        if (err) console.log('error w put',err.sqlMessage);
});
});

// SET_END analysis
app.put(API_ROUTS.cation_analysis_result.set_end, (req,res)=>{
    const id = req.body.id 
    const end = req.body.end
    db.query(API_QUERY.cation_analysis_result.set_end, [end,id] , (err, result)=>{
        if (result) {console.log('SET_END STATUS:',result.serverStatus);res.send(`SET_END in analysis - id: ${id}`)}
        if (err) console.log('error w SET_END',err.sqlMessage);
});
});


// SET_RESULT analysis
app.put(API_ROUTS.cation_analysis_result.set_result, (req,res)=>{
    const id = req.body.id 
    const result = req.body.result
    db.query(API_QUERY.cation_analysis_result.set_result, [result,id] , (err, result)=>{
        if (result) {console.log('SET_RESULTSTATUS:',result.serverStatus);res.send(`SET_RESULT in analysis - id: ${id}`)}
        if (err) console.log('error w SET_RESULT',err.sqlMessage);
});
});



app.delete(API_ROUTS.cation_analysis_result.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.cation_analysis_result.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_RESULT:',result.serverStatus); res.send(`deleted item - id: ${id}`)}
    if (err) console.log('problem delete ult',err.sqlMessage)})
});

// ###################### ULT_ANALYSIS end ############################

// ###################### anion_analysis_result start ############################

// ANION get all
app.get(API_ROUTS.anion_analysis_result.get, (req,res)=>{  
    db.query(API_QUERY.anion_analysis_result.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu anion analysis',err.sqlMessage);})
    });

// insert image ANION
app.post(API_ROUTS.anion_analysis_result.post, (req,res)=>{
    const id = req.body.id 
    const name = req.body.name
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const img1 = req.body.img1
    const img2 = req.body.img2
    const img3 = req.body.img3
    const img4 = req.body.img4
    const end = req.body.end
    const user_id = req.body.user_id
    const SQL_QUERY =  API_QUERY.anion_analysis_result.add;
    db.query(SQL_QUERY, [id,name,f1,f2,f3,f4,img1,img2,img3,img4,end, user_id], (err,result)=>{
        if (result) {console.log('INSERT STATUS:',result.serverStatus);res.send(`inserted item - id: ${id}`)}
        if (err) console.log('prolemos przy post anion_analysis_result: ',err.sqlMessage)})
    }); 


 // update ANION
 app.put(API_ROUTS.anion_analysis_result.put, (req,res)=>{
    
    const id = req.body.id 
    const name = req.body.name
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const img1 = req.body.img1
    const img2 = req.body.img2
    const img3 = req.body.img3
    const img4 = req.body.img4
    const end = req.body.end
    const LABELS = [name,f1,f2,f3,f4,img1,img2,img3,img4,end]
    const q = ['name','f1',"f2","f3",'f4','img1','img2','img3','img4','end']
    let not_null_array = []
    let current_set=''
    LABELS.map((lab,index)=>{
        if(typeof lab !== 'undefined') {not_null_array.push(lab); current_set=current_set+q[index]+'=?,'}
    })
    const ero = current_set.substring(0, current_set.length - 1);
    not_null_array.push(id) 
    let CUSTOM_QUERY=`UPDATE anion_analysis_result SET ${ero} WHERE id=?`;
    console.log('customquery',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY, not_null_array, (err, result)=>{
        if (result) {console.log('PUT STATUS:',result.serverStatus);res.send(`PUT item - id: ${id}`)}
        if (err) console.log('error w put',err.sqlMessage);
});
});

// SET_END analysis ANION
app.put(API_ROUTS.anion_analysis_result.set_end, (req,res)=>{
    const id = req.body.id 
    const end = req.body.end
    db.query(API_QUERY.anion_analysis_result.set_end, [end,id] , (err, result)=>{
        if (result) {console.log('SET_END STATUS:',result.serverStatus);res.send(`SET_END in anion_analysis_result - id: ${id}`)}
        if (err) console.log('error w SET_END',err.sqlMessage);
});
});


// SET_RESULT analysis ANION
app.put(API_ROUTS.anion_analysis_result.set_result, (req,res)=>{
    const id = req.body.id 
    const result = req.body.result
    db.query(API_QUERY.anion_analysis_result.set_result, [result,id] , (err, result)=>{
        if (result) {console.log('SET_RESULTSTATUS:',result.serverStatus);res.send(`SET_RESULT anion_analysis_result - id: ${id}`)}
        if (err) console.log('error w SET_RESULT',err.sqlMessage);
});
});



app.delete(API_ROUTS.anion_analysis_result.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.anion_analysis_result.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_RESULT:',result.serverStatus); res.send(`deleted item - id: ${id}`)}
    if (err) console.log('problem delete ult',err.sqlMessage)})
});

// ###################### anion_analysis_result end ############################




// _________________________ SHUFFLE start _____________________________________

app.put(API_ROUTS.shuffle.get, (req,res)=>{
    
    const phase = req.body.phase
    const db_type = req.body.db_type
    let label = req.body.label
    console.log('label = ',label)
    let CUSTOM_QUERY=`SELECT * FROM ${db_type} WHERE ${'f'+phase} = '${label}'`;
    console.log('------------------------',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY,  (err, result)=>{
        if (result) {console.log('GET shuffle STATUS:',result.serverStatus);res.send(result)}
        if (err) console.log('error w shuffle',err.sqlMessage);
});
});


// _________________________ SHUFFLE end _____________________________________




// CUSTOM QUERY ------------------- start

app.post(API_ROUTS.custom_query.get, (req,res)=>{  
    const QUERY = req.body.query
    db.query(QUERY, (err,result)=>{
            if (result) {console.log('custom qery STATUS:',result.serverStatus);res.send(result)}
            if (err) console.log('error at custom query',err.sqlMessage);})
    });


// CUSTOM QUERY ------------------- start




//------- cation script flow - start

//get all cation script flow
app.get(API_ROUTS.cation_script_flow.get, (req,res)=>{
    db.query(API_QUERY.cation_script_flow.get, (err,result)=>{
        if(result) { res.send(result);   console.log('DOWNLAOD Cation script flow')}
        if (err) console.log('prolemos przy post get/cation_script_flow: ',err.sqlMessage);
    })
});


//wstawianie cation script flow
app.post(API_ROUTS.cation_script_flow.post, (req,res)=>{
     const id = req.body.id 
     const symbol = req.body.symbol
     const f1 = req.body.f1
     const f2 = req.body.f2
     const f3 = req.body.f3
     const f4 = req.body.f4
     const f5 = req.body.f5
     const f6 = req.body.f6
     const f7 = req.body.f7
     db.query(API_QUERY.cation_script_flow.add, [id,symbol,f1,f2,f3,f4,f5,f6,f7], (err,result)=>{
        if (result)  {console.log('INSERT_CATION:',result.serverStatus); res.send(`inserted item to cation_script - id: ${id}`)}
        if (err) console.log('problem cation insert',err.sqlMessage) 
        })
 });


// update cation script flow
app.put(API_ROUTS.cation_script_flow.put, (req,res)=>{
    const id = req.body.id 
    const symbol = req.body.symbol
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const f5 = req.body.f5
    const f6 = req.body.f6
    const f7 = req.body.f7
    db.query(API_QUERY.cation_script_flow.put, [ symbol,f1,f2,f3,f4,f5,f6,f7,id], (err, result)=>{
        if (result)  {console.log('PUT_CATION:',result.serverStatus); res.send(`updated item from cation_script - id: ${id}`)}
        if (err) console.log('problem cation put',err.sqlMessage)  
    });
});

// delete cation script flow
app.delete(API_ROUTS.cation_script_flow.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.cation_script_flow.delete, id, (err, result)=>{
        if (result.serverStatus==2)  {console.log('DELETE_RESULT_CAtions script:',result.serverStatus); res.send(`deleted item from cation_voice_script - id: ${id}`)}
        if (err) console.log('problem delete CAtions script:',err.sqlMessage) 
    });
});

//------- cation script flow - end





//------- anion script flow - start --------------------

//get all anion script flow
app.get(API_ROUTS.anion_script_flow.get, (req,res)=>{
    db.query(API_QUERY.anion_script_flow.get, (err,result)=>{
        if(result) { res.send(result);   console.log('DOWNLAOD anion script flow')}
        if (err) console.log('prolemos przy post get/ anion cation_script_flow: ',err.sqlMessage);
    })
});


//wstawianie anion script flow
app.post(API_ROUTS.anion_script_flow.post, (req,res)=>{
     const id = req.body.id 
     const symbol = req.body.symbol
     const f1 = req.body.f1
     const f2 = req.body.f2
     const f3 = req.body.f3
     const f4 = req.body.f4
     db.query(API_QUERY.anion_script_flow.add, [id,symbol,f1,f2,f3,f4], (err,result)=>{
        if (result)  {console.log('INSERT_ANION:',result.serverStatus); res.send(`inserted item to anion_script - id: ${id}`)}
        if (err) console.log('problem anion insert',err.sqlMessage)   
    })
 });


// update anion script flow
app.put(API_ROUTS.anion_script_flow.put, (req,res)=>{
    const id = req.body.id 
    const symbol = req.body.symbol
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4

    db.query(API_QUERY.anion_script_flow.put, [ symbol,f1,f2,f3,f4,id], (err, result)=>{
        if (result)  {console.log('PUT_ANION:',result.serverStatus); res.send(`putted item to anion_script - id: ${id}`)}
        if (err) console.log('problem anion put',err.sqlMessage)   
    });
});

// delete anion script flow
app.delete(API_ROUTS.anion_script_flow.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.anion_script_flow.delete, id, (err, result)=>{
        if (result)  {console.log('DEL_ANION:',result.serverStatus); res.send(`deleted item from anion_script - id: ${id}`)}
        if (err) console.log('problem anion delete',err.sqlMessage)   
    });
});

//------- anion script flow - end ----------------------



// _______+++++++++++________ cation cation_voice_script start __________+++++++++++______________

//get all
app.get(API_ROUTS.cation_voice_script.get, (req,res)=>{  
    db.query(API_QUERY.cation_voice_script.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu cation_voice_script',err.sqlMessage);})
    });


    //get all
app.get(API_ROUTS.cation_voice_script_en.get, (req,res)=>{  
    db.query(API_QUERY.cation_voice_script_en.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu cation_voice_script_en',err.sqlMessage);})
    });

//insert script
app.post(API_ROUTS.cation_voice_script.post, (req,res)=>{
        const id = req.body.id 
        const phase = req.body.phase 
        const f1 = req.body.f1
        const f2 = req.body.f2
        const f3 = req.body.f3
        const f4 = req.body.f4
        const f5 = req.body.f5
        const f6 = req.body.f6
        const f7 = req.body.f7
        const match_id = req.body.match_id
        const script = req.body.script
    
        db.query(API_QUERY.cation_voice_script.add, [id,phase,f1,f2,f3,f4,f5,f6,f7,match_id,script], (err,result)=>{
            if (result) {console.log('INSERT (Voice) STATUS:',result.serverStatus);res.send(`inserted cation_voice_script - id: ${id}`)}
            if (err) console.log('error przy wysylaniu cation_voice_script',err.sqlMessage)})
    });

    //insert script
app.post(API_ROUTS.cation_voice_script_en.post, (req,res)=>{
    const id = req.body.id 
    const phase = req.body.phase 
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const f5 = req.body.f5
    const f6 = req.body.f6
    const f7 = req.body.f7
    const match_id = req.body.match_id
    const script = req.body.script

    db.query(API_QUERY.cation_voice_script_en.add, [id,phase,f1,f2,f3,f4,f5,f6,f7,match_id,script], (err,result)=>{
        if (result) {console.log('INSERT (Voice) STATUS:',result.serverStatus);res.send(`inserted cation_voice_script_en - id: ${id}`)}
        if (err) console.log('error przy wysylaniu cation_voice_script_en',err.sqlMessage)})
});

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.cation_voice_script.put, (req,res)=>{
    const id = req.body.id 
    const phase = req.body.phase 
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const f5 = req.body.f5
    const f6 = req.body.f6
    const f7 = req.body.f7
    const match_id = req.body.match_id
    const script = req.body.script

    db.query(API_QUERY.cation_voice_script.put, [ phase,f1,f2,f3,f4,f5,f6,f7,match_id,script,id], (err, result)=>{
        if (result) {console.log('UPDATE (Voice) STATUS:',result.serverStatus);res.send(`updated cation_voice_script - id: ${id}`)}
        if (err) console.log('error while updating cation_voice_script',err.sqlMessage)
    });
});

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.cation_voice_script_en.put, (req,res)=>{
    const id = req.body.id 
    const phase = req.body.phase 
    const f1 = req.body.f1
    const f2 = req.body.f2
    const f3 = req.body.f3
    const f4 = req.body.f4
    const f5 = req.body.f5
    const f6 = req.body.f6
    const f7 = req.body.f7
    const match_id = req.body.match_id
    const script = req.body.script

    db.query(API_QUERY.cation_voice_script_en.put, [ phase,f1,f2,f3,f4,f5,f6,f7,match_id,script,id], (err, result)=>{
        if (result) {console.log('UPDATE (Voice) STATUS:',result.serverStatus);res.send(`updated cation_voice_script_en - id: ${id}`)}
        if (err) console.log('error while updating cation_voice_script_en',err.sqlMessage)
    });
});

app.delete(API_ROUTS.cation_voice_script.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.cation_voice_script.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_RESULT_VOICE:',result.serverStatus); res.send(`deleted item from cation_voice_script - id: ${id}`)}
    if (err) console.log('problem delete voicescript',err.sqlMessage)})
});

app.delete(API_ROUTS.cation_voice_script_en.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.cation_voice_script_en.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_RESULT_VOICE:',result.serverStatus); res.send(`deleted item from cation_voice_script_en - id: ${id}`)}
    if (err) console.log('problem delete cation_voice_script_en',err.sqlMessage)})
});

//get required script
app.put(API_ROUTS.cation_voice_script.get_required_script, (req,res)=>{
    
    const phase = req.body.phase
    const match_id = req.body.match_id
    
    let CUSTOM_QUERY=`SELECT * FROM cation_voice_script WHERE phase = ${phase} AND match_id LIKE '%,${match_id},%'`;
    console.log('------------------------',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY,  (err, result)=>{
        if (result) {console.log('GET required script STATUS:',result.serverStatus);res.send(result)}
        if (err) console.log('error w required script',err.sqlMessage);
});
});

//get required script
app.put(API_ROUTS.cation_voice_script_en.get_required_script, (req,res)=>{
    
    const phase = req.body.phase
    const match_id = req.body.match_id
    
    let CUSTOM_QUERY=`SELECT * FROM cation_voice_script_en WHERE phase = ${phase} AND match_id LIKE '%,${match_id},%'`;
    console.log('------------------------',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY,  (err, result)=>{
        if (result) {console.log('GET required script STATUS:',result.serverStatus);res.send(result)}
        if (err) console.log('error w required script',err.sqlMessage);
});
});

// _______+++++++++++________ cation cation_voice_script end __________+++++++++++______________









// _______+++++++++++________ anion anion_voice_script start __________+++++++++++______________

//get all
app.get(API_ROUTS.anion_voice_script.get, (req,res)=>{  
    db.query(API_QUERY.anion_voice_script.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu anion_voice_script',err.sqlMessage);})
    });

    //get all
app.get(API_ROUTS.anion_voice_script_en.get, (req,res)=>{  
    db.query(API_QUERY.anion_voice_script_en.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu anion_voice_script_en',err.sqlMessage);})
    });

//insert script
app.post(API_ROUTS.anion_voice_script.post, (req,res)=>{
        const id = req.body.id 
        const phase = req.body.phase 
        const f6 = req.body.f6
        const f7 = req.body.f7
        const match_id = req.body.match_id
        const script = req.body.script
    
        db.query(API_QUERY.anion_voice_script.add, [id,phase,f6,f7,match_id,script], (err,result)=>{
            if (result) {console.log('INSERT (Voice) STATUS:',result.serverStatus);res.send(`inserted anion_voice_script - id: ${id}`)}
            if (err) console.log('error przy wysylaniu anion_voice_script',err.sqlMessage)})
    });

    //insert script
app.post(API_ROUTS.anion_voice_script_en.post, (req,res)=>{
    const id = req.body.id 
    const phase = req.body.phase 
    const f6 = req.body.f6
    const f7 = req.body.f7
    const match_id = req.body.match_id
    const script = req.body.script

    db.query(API_QUERY.anion_voice_script_en.add, [id,phase,f6,f7,match_id,script], (err,result)=>{
        if (result) {console.log('INSERT (Voice) STATUS:',result.serverStatus);res.send(`inserted anion_voice_script_en - id: ${id}`)}
        if (err) console.log('error przy wysylaniu anion_voice_script_en',err.sqlMessage)})
});

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.anion_voice_script.put, (req,res)=>{
    const id = req.body.id 
    const phase = req.body.phase 
    const f6 = req.body.f6
    const f7 = req.body.f7
    const match_id = req.body.match_id
    const script = req.body.script

    db.query(API_QUERY.anion_voice_script.put, [ phase,f6,f7,match_id,script,id], (err, result)=>{
        if (result) {console.log('UPDATE (Voice) STATUS:',result.serverStatus);res.send(`updated anion_voice_script - id: ${id}`)}
        if (err) console.log('error while updating anion_voice_script',err.sqlMessage)
    });
});

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.anion_voice_script_en.put, (req,res)=>{
    const id = req.body.id 
    const phase = req.body.phase 
    const f6 = req.body.f6
    const f7 = req.body.f7
    const match_id = req.body.match_id
    const script = req.body.script

    db.query(API_QUERY.anion_voice_script_en.put, [ phase,f6,f7,match_id,script,id], (err, result)=>{
        if (result) {console.log('UPDATE (Voice) STATUS:',result.serverStatus);res.send(`updated anion_voice_script - id: ${id}`)}
        if (err) console.log('error while updating anion_voice_script_en',err.sqlMessage)
    });
});



app.delete(API_ROUTS.anion_voice_script.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.anion_voice_script.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_RESULT_VOICE:',result.serverStatus); res.send(`deleted item from anion_voice_script - id: ${id}`)}
    if (err) console.log('problem delete anion_voice_script',err.sqlMessage)})
});

app.delete(API_ROUTS.anion_voice_script_en.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.anion_voice_script_en.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_RESULT_VOICE:',result.serverStatus); res.send(`deleted item from anion_voice_script_en - id: ${id}`)}
    if (err) console.log('problem delete anion_voice_script_en',err.sqlMessage)})
});


//get required script
app.put(API_ROUTS.anion_voice_script.get_required_script, (req,res)=>{
    
    const phase = req.body.phase
    const match_id = req.body.match_id
    
    let CUSTOM_QUERY=`SELECT * FROM anion_voice_script WHERE phase = ${phase} AND match_id LIKE '%,${match_id},%'`;
    console.log('------------------------',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY,  (err, result)=>{
        if (result) {console.log('GET required script STATUS:',result.serverStatus);res.send(result)}
        if (err) console.log('error w required script',err.sqlMessage);
});
});

//get required script
app.put(API_ROUTS.anion_voice_script_en.get_required_script, (req,res)=>{
    
    const phase = req.body.phase
    const match_id = req.body.match_id
    
    let CUSTOM_QUERY=`SELECT * FROM anion_voice_script_en WHERE phase = ${phase} AND match_id LIKE '%,${match_id},%'`;
    console.log('------------------------',CUSTOM_QUERY)
    
    db.query(CUSTOM_QUERY,  (err, result)=>{
        if (result) {console.log('GET required script STATUS:',result.serverStatus);res.send(result)}
        if (err) console.log('error w required script',err.sqlMessage);
});
});

// _______+++++++++++________ anion anion_voice_script end __________+++++++++++______________









//  Cation TEXT start ////////////////

//get all
app.get(API_ROUTS.cation_analysis_result_texts.get, (req,res)=>{  
    db.query(API_QUERY.cation_analysis_result_texts.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu cation TEXT',err.sqlMessage);})
    });

//insert script
app.post(API_ROUTS.cation_analysis_result_texts.post, (req,res)=>{
        const id = req.body.id 
        const f1 = req.body.f1
        const f2 = req.body.f2
        const f3 = req.body.f3
        const f4 = req.body.f4
        const f5 = req.body.f5
        const f6 = req.body.f6
        const f7 = req.body.f7
    
        db.query(API_QUERY.cation_analysis_result_texts.add, [id,f1,f2,f3,f4,f5,f6,f7], (err,result)=>{
            if (result) {console.log('INSERT cation TEXT STATUS:',result.serverStatus);res.send(`insertedcation TEXT - id: ${id}`)}
            if (err) console.log('error przy wysylaniu cation TEXT',err.sqlMessage)})
    });

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.cation_analysis_result_texts.put, (req,res)=>{

        const id = req.body.id 
        const query = req.body.query 
        const data = req.body.script

    db.query(query, [ data,id], (err, result)=>{
        if (result) {console.log('UPDATE cation TEXT STATUS:',result.serverStatus);res.send(`updated cation TEXT - id: ${id}`)}
        if (err) console.log('error while updating cation_analysis_result_texts ',err.sqlMessage)
    });
});



app.delete(API_ROUTS.cation_analysis_result_texts.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.cation_analysis_result_texts.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_cation TEXT:',result.serverStatus); res.send(`deleted item from cation TEXT - id: ${id}`)}
    if (err) console.log('problem delete cation TEXT',err.sqlMessage)})
});


//  Cation TEXT end ////////////////






//  Anion TEXT start ////////////////

//get all
app.get(API_ROUTS.anion_analysis_result_texts.get, (req,res)=>{  
    db.query(API_QUERY.anion_analysis_result_texts.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu Anion TEXT',err.sqlMessage);})
    });

//insert script
app.post(API_ROUTS.anion_analysis_result_texts.post, (req,res)=>{
        const id = req.body.id 
        const f1 = req.body.f1
        const f2 = req.body.f2
        const f3 = req.body.f3
        const f4 = req.body.f4
        db.query(API_QUERY.anion_analysis_result_texts.add, [id,f1,f2,f3,f4], (err,result)=>{
            if (result) {console.log('INSERT Anion TEXT STATUS:',result.serverStatus);res.send(`inserted Anion TEXT - id: ${id}`)}
            if (err) console.log('error przy wysylaniu Anion TEXT',err.sqlMessage)})
    });

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.anion_analysis_result_texts.put, (req,res)=>{
        const id = req.body.id 
        const f1 = req.body.f1
        const f2 = req.body.f2
        const f3 = req.body.f3
        const f4 = req.body.f4
    db.query(API_QUERY.anion_analysis_result_texts.put, [ f1,f2,f3,f4,id], (err, result)=>{
        if (result) {console.log('UPDATE Anion TEXT STATUS:',result.serverStatus);res.send(`updated Anion TEXT - id: ${id}`)}
        if (err) console.log('error while updating Anion TEXT',err.sqlMessage)
    });
});



app.delete(API_ROUTS.anion_analysis_result_texts.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.anion_analysis_result_texts.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_ Anion TEXT:',result.serverStatus); res.send(`deleted item from Anion TEXT - id: ${id}`)}
    if (err) console.log('problem delete Anion TEXT',err.sqlMessage)})
});


//  Anion TEXT end ////////////////






// test images --------------------- start

//get all
app.get(API_ROUTS.test_images.get, (req,res)=>{  
    db.query(API_QUERY.test_images.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error during downloadin test img',err.sqlMessage);})
    });

//insert script
app.post(API_ROUTS.test_images.post, (req,res)=>{
        const id = req.body.id 
        const label= req.body.label 
        const img = req.body.img
    
        db.query(API_QUERY.test_images.add, [id,img,label], (err,result)=>{
            if (result) {console.log('INSERT test img STATUS:',result.serverStatus);res.send(`inserted cation_voice_script - id: ${id}`)}
            if (err) console.log('error przy wysylaniu test img',err.sqlMessage)})
    });

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.test_images.put, (req,res)=>{
    const id = req.body.id 
    const label= req.body.label 
    const img = req.body.img

    db.query(API_QUERY.test_images.put, [ img,label,id], (err, result)=>{
        if (result) {console.log('UPDATE test img STATUS:',result.serverStatus);res.send(`updated cation_voice_script - id: ${id}`)}
        if (err) console.log('error while updating test img',err.sqlMessage)
    });
});



app.delete(API_ROUTS.test_images.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.test_images.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE_test img:',result.serverStatus); res.send(`deleted item from cation_voice_script - id: ${id}`)}
    if (err) console.log('problem delete test img',err.sqlMessage)})
});


// test images --------------------- end




//  chat_messages start ////////////////

//get all
app.get(API_ROUTS.chat_messages.get_all, (req,res)=>{  
    db.query(API_QUERY.chat_messages.get_all, (err,result)=>{
            res.send(result)
            if (err) console.log('error przy pobieraniu chat_messages get_all',err.sqlMessage);})
    });

//get one conversation
app.get(API_ROUTS.chat_messages.get_one_conversation, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.chat_messages.get_one_conversation, id, (err, result)=>{
        res.send(result)
        if (err) console.log('error przy pobieraniu chat_messages get_one_message',err.sqlMessage)})
});

//insert message
app.post(API_ROUTS.chat_messages.post, (req,res)=>{
        const chat_id = req.body.chat_id 
        const message = req.body.message
        const author = req.body.author
        const ion = req.body.ion
        db.query(API_QUERY.chat_messages.add, [chat_id,message,ion,author], (err,result)=>{
            if (result) {console.log('INSERT chat_messages STATUS:',result.serverStatus);res.send(`inserted chat_messages - id: ${chat_id}`)}
            if (err) console.log('error przy wysylaniu chat_messages ',err.sqlMessage)})
    });


app.delete(API_ROUTS.chat_messages.delete, (req,res)=>{
    const chat_id = req.params.id
    db.query(API_QUERY.chat_messages.delete, chat_id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('chat_messages delete:',result.serverStatus); res.send(`deleted item from  chat_messages - id: ${chat_id}`)}
    if (err) console.log('problem delete  chat_messages',err.sqlMessage)})
});

// mark
app.put(API_ROUTS.chat_messages.put, (req,res)=>{
    const id = req.body.id 
    const mark= req.body.mark

    db.query(API_QUERY.chat_messages.mark_as_read, [ mark,id], (err, result)=>{
        if (result) {console.log('UPDATE mark STATUS:',result.serverStatus);res.send(`marked message - id: ${id}`)}
        if (err) console.log('error while marking message',err.sqlMessage)
    });
});
// chat_messages end ////////////////






// image_storage  --------------------- start

//get all
app.get(API_ROUTS.image_storage.get, (req,res)=>{  
    db.query(API_QUERY.image_storage.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error during downloading image_storage ',err.sqlMessage);})
    });

//insert script
app.post(API_ROUTS.image_storage.post, (req,res)=>{
        const id = req.body.id 
        const label= req.body.label 
        const img = req.body.img
    
        db.query(API_QUERY.image_storage.add, [id,img,label], (err,result)=>{
            if (result) {console.log('INSERT img to image_storage STATUS:',result.serverStatus);res.send(`inserted img to image_storage - id: ${id}`)}
            if (err) console.log('error while INSERT img to image_storage ',err.sqlMessage)})
    });

// aktualizowanie danych w bazie danych
app.put(API_ROUTS.image_storage.put, (req,res)=>{
    const id = req.body.id 
    const label= req.body.label 
    const img = req.body.img

    db.query(API_QUERY.image_storage.put, [ img,label,id], (err, result)=>{
        if (result) {console.log('UPDATE img to image_storage STATUS:',result.serverStatus);res.send(`updated img to image_storage - id: ${id}`)}
        if (err) console.log('error while updating img in image_storage',err.sqlMessage)
    });
});



app.delete(API_ROUTS.image_storage.delete, (req,res)=>{
    const id = req.params.id
    db.query(API_QUERY.image_storage.delete, id, (err, result)=>{
    if (result.serverStatus==2)  {console.log('DELETE image_storage STATUS:',result.serverStatus); res.send(`deleted item from image_storage - id: ${id}`)}
    if (err) console.log('problem while delete test img from image_storage',err.sqlMessage)})
});


//  image_storage --------------------- end


// account_credentials -------------------------- start


//get all
app.get(API_ROUTS.account_credentials.get , (req,res)=>{  
    db.query(API_QUERY.account_credentials.get, (err,result)=>{
            res.send(result)
            if (err) console.log('error during downloading account_credentials ',err.sqlMessage);})
    });


// account_credentials -------------------------- end