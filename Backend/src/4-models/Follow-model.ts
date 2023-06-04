class FollowModel{
    
    public followId: number;
    public userId : number;
    public vacationId : number;

    public constructor(follow: FollowModel){
        this.followId = follow.followId;
        this.userId = follow.userId;
        this.vacationId = follow.vacationId;
    }
}
export default FollowModel;