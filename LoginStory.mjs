import Story from "./BaseStory.mjs"
import webdriver from 'selenium-webdriver'

export default class LoginStory extends Story{
    constructor(arrStory){
        super(arrStory);
       //declear variables
       this.username='';
       this.password='';
       this.expected='';
       this.actual='';
    }
    When(leftMessage){
        super.When(leftMessage);
        //save values into variables 'username' and 'password' when the sentence has '[]'
        if (/enter\suser\sname/i.test(leftMessage)){
           let strString=leftMessage;
           let start= strString.indexOf("[");
           let end=strString.indexOf("]");
           let strLength=end-start-1;
           this.username=strString.substr(start+1,strLength);
           console.log(this.username);
        }
        if (/enter\spassword/i.test(leftMessage)){
            let strString=leftMessage;
            let start= strString.indexOf("[");
            let end=strString.indexOf("]");
            let strLength=end-start-1;
            this.password=strString.substr(start+1,strLength);
            console.log(this.password);  
        }

        
    }
    Then(leftMessage){
        super.Then(leftMessage);
        //read the value of Then, put it into variable 'expected'.
        let strString=leftMessage;
        let start= strString.indexOf("[");
        let end=strString.indexOf("]");
        let strLength=end-start-1;
        this.expected=strString.substr(start+1,strLength);
        console.log(this.expected);  
        //open the website and automatic login.Get the result message from website and save it into variable 'actual'.
        let driver = new webdriver.Builder().forBrowser("chrome").build();
        const msg_url="https://everdoc.github.io/hellojs/quize/login.html";
        driver.get(msg_url);
        driver.wait(webdriver.until.urlIs(msg_url),1000*10)
        .then((success)=>{
            driver.findElement(webdriver.By.id('name')).sendKeys(this.username); 
            driver.findElement(webdriver.By.id('password')).sendKeys(this.password); 
            driver.findElement(webdriver.By.className('ui button')).click();
            driver.findElement(webdriver.By.id('result')).getText().then((message)=>{ 
                this.actual=message; 
                console.log(this.actual);
                //Compare the two variables 'expected' and 'actual' to determine whether this step is Pass or Failed.
                let reg=new RegExp(this.expected,'i');
                if (reg.test(this.actual)){
                    console.log('This step is Pass.'); 
                }else{
                    console.log('This step is Failed.'); 
                }
                
                driver.quit();
        });

           
        },
        (reason)=>{ 
            // do nothing 
            console.log(reason); 
            driver.quit(); 
            });
    
    }    
}