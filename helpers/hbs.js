const moment=require('moment');
module.exports={
    trunc:function(str,len){
        if(str.length > len && str.length > 0)
        {
            var new_str = str + " ";
            new_str = str.substr(0,len);
            new_str = str.substr(0,new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0,len);
            return new_str + '...'; 
        }
        return str;
    },
    strip:function(){
        
    },
    formatDate:function(date,format){
        return moment(date).format(format)
    },
    isequal:function(a,b)
    {
        return a.equals(b);
    },
    editIcon:function(storyUser, loggedUser , storyId, floating=true)
    {
        if(storyUser==loggedUser)
        {
            if(floating)
            {
                var x= '<a class="btn-lg btn-danger float-right text-bottom" style="border-radius:60% !important;" href="/stories/edit/';
                var y=storyId;
                var z='"><i class="fa fa-pencil"></i></a>';
                var p=x.concat(y,z);
                return p;
            }
         }
        else
        {
            return '';
        }
    }
}