//!Monster Hunt File Js

new Vue({
    el:'#app',
    data: {
        
        player_heal:100,
        monster_heal:100,
        game_is_on:false,
        logs_window : [],
        
        attack_multiple:10,
        special_attack_multiple:25,
        heal_up_multiple:20,
        monster_attack_multiple:15,

        log_text:{
            attack_attack:'Oyuncu Atagi : ',
            special_attack:'Ozel Oyuncu Atagi : ',
            heal_up_attack:'Ilk Yardim : ',
            give_up_attack:'Oyuncu Pes Etti : ',
            monster_attack:'Canavar Atagi : ',
        }

    },
    methods:{
        start_game:function(){
            this.game_is_on = true
        },
        attack:function(){
            var point = Math.ceil((Math.random()*this.attack_multiple))
            this.monster_heal -= point
            this.add_to_log({turn:'P',text:`${this.log_text.attack_attack} ${point}`})
            this.monster_attack()
        },
        special_attack:function(){
            var point = Math.ceil(Math.random()*this.special_attack_multiple)
            this.monster_heal -= point
            this.add_to_log({turn:'P',text:`${this.log_text.special_attack} ${point}`})
            this.monster_attack()
        },
        heal_up:function(){//increase heal
            var point = Math.ceil(Math.random()*this.heal_up_multiple)
            this.player_heal += point
            this.add_to_log({turn:'P',text:`${this.log_text.heal_up_attack} ${point}`})
            this.monster_attack()
        },
        give_up:function(){
            this.player_heal = 0
            this.add_to_log({turn:'P',text:`${this.log_text.give_up_attack}`})
        },
        monster_attack:function(){
            var point = Math.ceil(Math.random()*this.monster_attack_multiple)
            this.player_heal -= point
            this.add_to_log({turn:'M',text:`${this.log_text.monster_attack} ${point}`})
        },

        add_to_log:function(data){
            this.logs_window.push(data)
        }
    },
    watch:{
        player_heal:function(value){
            if(value<=0){
                this.player_heal = 0
                if(confirm('Oyunu KAYBETTIN.Tekrar Denemek Ister Misin?')){
                    this.player_heal = 100
                    this.monster_heal = 100
                    this.logs_window = []
                } 
            }
            else if(value >= 100){
                this.player_heal = 100
            }
        },
        monster_heal:function(value){
            if(value<=0){
                this.monster_heal = 0
                if(confirm('Oyun KAZANDIN.Tekrar Oynamak Ister Misin?')){
                    this.player_heal = 100
                    this.monster_heal = 100
                    this.logs_window = []
                }
            }
        }
    },
    computed:{
        user_progress:function(){
            return{
                width:this.player_heal + '%'
            }
        },
        monster_progress:function(){
            return{
                width:this.monster_heal + '%'
            }
        }
    }
})