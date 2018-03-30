export default class Story{
    constructor(arrStory){
        this.arrStory=arrStory;
    }

    Given(leftMessage) {
        // console.log(`It's a given: ${message}`);
        this.event("given",leftMessage);
    }

    When(leftMessage){
        // console.log(`It's a when: ${message}`);
        this.event("when",leftMessage);
    }

    Then(leftMessage){
        // console.log(`It's a then: ${message}`);
        this.event("then",leftMessage);
    }

    event(key,leftMessage){
        console.log(`It's a ${key}: ${leftMessage}`);
    }

    Play(){
        for (let index = 0; index < this.arrStory.length; index++) {
            let strContent = this.arrStory[index];
            let strSeparator=strContent.indexOf(":");
            let key=strContent.substr(0,strSeparator);
            let leftMessage=strContent.substr(strSeparator+1);
            switch (key) {
                case "Given":
                    this.Given(leftMessage);
                    break;
                case "When":
                    this.When(leftMessage);
                    break;
                case "Then":
                    this.Then(leftMessage);
                    break;
                default:
                    this.event(key,leftMessage);
                    break;
            }
        }
    }
}
