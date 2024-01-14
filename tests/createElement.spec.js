import React from "../core/React.js";
import { it, expect, describe} from "vitest";

describe('createElement', () => {
    it('run vdom', () => {
        const el = React.createElement("div",{id:"app"},"ii","uu",'hhhhhhh');

        expect(el).toEqual({
            type:"div",
            props:{
                id:"app",
                children:[
                    {
                        type:"text element",
                        props:{
                            nodeValue:"ii",
                            children:[]
                        }
                    },
                    {
                        type:"text element",
                        props:{
                            nodeValue:"uu",
                            children:[]
                        }
                    },
                    {
                        type:"text element",
                        props:{
                            nodeValue:"hhhhhhh",
                            children:[]
                        }
                    }
                ]
            }
        })
    });
    
});
