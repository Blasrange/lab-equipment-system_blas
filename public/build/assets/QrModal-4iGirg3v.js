import{j as t}from"./ui-Cj8tNzmz.js";import{u as W}from"./app-C407sp3e.js";import{r as w}from"./inertia-C4EOeDop.js";import{D as I,a as _,b as S}from"./DialogTitle-sibcV60X.js";import{B as l,T as a,I as A,P as v,b as h}from"./Modal-CNzxI3bH.js";import{Q as j}from"./QrCode-D5-lIuoG.js";import{c as C,u as z,s as q,b as T,m as $,C as y}from"./Close-N_b2r1ZG.js";import{C as L,D as B}from"./DialogActions-Uv7Ck0Ei.js";import{c as H}from"./clsx-B-dksMZM.js";import{g as P}from"./dividerClasses-BaHv2y2B.js";import"./vendor-Y7T1HomI.js";/* empty css            */const M=C(t.jsx("path",{d:"M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"})),Q=C(t.jsx("path",{d:"M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3m-3 11H8v-5h8zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-1-9H6v4h12z"})),V=e=>{const{absolute:o,children:i,classes:c,flexItem:x,light:r,orientation:d,textAlign:n,variant:p}=e;return T({root:["root",o&&"absolute",p,r&&"light",d==="vertical"&&"vertical",x&&"flexItem",i&&"withChildren",i&&d==="vertical"&&"withChildrenVertical",n==="right"&&d!=="vertical"&&"textAlignRight",n==="left"&&d!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",d==="vertical"&&"wrapperVertical"]},P,c)},E=q("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:i}=e;return[o.root,i.absolute&&o.absolute,o[i.variant],i.light&&o.light,i.orientation==="vertical"&&o.vertical,i.flexItem&&o.flexItem,i.children&&o.withChildren,i.children&&i.orientation==="vertical"&&o.withChildrenVertical,i.textAlign==="right"&&i.orientation!=="vertical"&&o.textAlignRight,i.textAlign==="left"&&i.orientation!=="vertical"&&o.textAlignLeft]}})($(({theme:e})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:e.alpha((e.vars||e).palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:e.spacing(2),marginRight:e.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:e.spacing(1),marginBottom:e.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:o})=>!!o.children,style:{display:"flex",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:o})=>o.children&&o.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:o})=>o.orientation==="vertical"&&o.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:o})=>o.textAlign==="right"&&o.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:o})=>o.textAlign==="left"&&o.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),N=q("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,o)=>{const{ownerState:i}=e;return[o.wrapper,i.orientation==="vertical"&&o.wrapperVertical]}})($(({theme:e})=>({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`,whiteSpace:"nowrap",variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`}}]}))),g=w.forwardRef(function(o,i){const c=z({props:o,name:"MuiDivider"}),{absolute:x=!1,children:r,className:d,orientation:n="horizontal",component:p=r||n==="vertical"?"div":"hr",flexItem:m=!1,light:b=!1,role:s=p!=="hr"?"separator":void 0,textAlign:k="center",variant:D="fullWidth",...R}=c,f={...c,absolute:x,component:p,flexItem:m,light:b,orientation:n,role:s,textAlign:k,variant:D},u=V(f);return t.jsx(E,{as:p,className:H(u.root,d),role:s,ref:i,ownerState:f,"aria-orientation":s==="separator"&&(p!=="hr"||n==="vertical")?n:void 0,...R,children:r?t.jsx(N,{className:u.wrapper,ownerState:f,children:r}):null})});g&&(g.muiSkipListHighlight=!0);const ot=({open:e,onClose:o,equipment:i,qrImageUrl:c,onOpenTaskManagement:x})=>{const{t:r,language:d}=W(),n=w.useRef(null),p=()=>{const b=document.createElement("a");b.href=c,b.download=`qr-${i.int_code}-${i.instrument.replace(/\s+/g,"-")}.png`,document.body.appendChild(b),b.click(),document.body.removeChild(b)},m=()=>{if(!n.current)return;const s=window.open("","_blank");s&&(s.document.write(`
            <html>
                <head>
                    <title>${r("qr.modal.title")} - ${i.instrument}</title>
                    <style>
                        body {
                            font-family: 'Roboto', Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background: white;
                        }
                        .print-container {
                            max-width: 600px;
                            margin: 0 auto;
                            text-align: center;
                        }
                        .header {
                            margin-bottom: 30px;
                            border-bottom: 2px solid #3b82f6;
                            padding-bottom: 20px;
                        }
                        .title {
                            font-size: 24px;
                            font-weight: bold;
                            color: #1a202c;
                            margin-bottom: 10px;
                        }
                        .subtitle {
                            font-size: 16px;
                            color: #4a5568;
                            margin-bottom: 5px;
                        }
                        .qr-section {
                            margin: 30px 0;
                            padding: 20px;
                            border: 2px dashed #e2e8f0;
                            background: #f8fafc;
                        }
                        .qr-image {
                            max-width: 300px;
                            height: auto;
                            margin: 20px 0;
                        }
                        .equipment-details {
                            margin-top: 30px;
                            text-align: left;
                            background: #f7fafc;
                            padding: 20px;
                            border-radius: 8px;
                        }
                        .detail-row {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 10px;
                            padding: 8px 0;
                            border-bottom: 1px solid #e2e8f0;
                        }
                        .detail-label {
                            font-weight: bold;
                            color: #2d3748;
                        }
                        .detail-value {
                            color: #4a5568;
                        }
                        .instructions {
                            margin-top: 30px;
                            padding: 20px;
                            background: #ebf8ff;
                            border-left: 4px solid #3b82f6;
                            text-align: left;
                        }
                        .footer {
                            margin-top: 40px;
                            padding-top: 20px;
                            border-top: 1px solid #e2e8f0;
                            font-size: 12px;
                            color: #718096;
                        }
                        @media print {
                            body { margin: 0; }
                            .print-container { max-width: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="print-container">
                        <div class="header">
                            <div class="title">🔧 ${r("qr.modal.subtitle")}</div>
                            <div class="subtitle">${r("qr.modal.qr_subtitle")}</div>
                        </div>
                        
                        <div class="qr-section">
                            <h3 style="color: #3b82f6; margin-bottom: 15px;">${r("qr.modal.scan_title")}</h3>
                            <img src="${c}" alt="QR Code" class="qr-image" />
                        </div>
                        
                        <div class="equipment-details">
                            <h4 style="color: #2d3748; margin-bottom: 15px;">${r("qr.modal.equipment_details")}</h4>
                            <div class="detail-row">
                                <span class="detail-label">${r("qr.modal.equipment.instrument")}</span>
                                <span class="detail-value">${i.instrument}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${r("qr.modal.equipment.internal_code")}</span>
                                <span class="detail-value">${i.int_code}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${r("qr.modal.equipment.brand")}</span>
                                <span class="detail-value">${i.brand}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${r("qr.modal.equipment.model")}</span>
                                <span class="detail-value">${i.model}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">${r("qr.modal.equipment.serial_number")}</span>
                                <span class="detail-value">${i.serial_number}</span>
                            </div>
                        </div>
                        
                        <div class="instructions">
                            <h4 style="color: #2b6cb0; margin-bottom: 10px;">${r("qr.modal.usage_instructions")}</h4>
                            <ol style="margin: 0; padding-left: 20px; color: #4a5568;">
                                <li>${r("qr.modal.instructions.scan")}</li>
                                <li>${r("qr.modal.instructions.access")}</li>
                                <li>${r("qr.modal.instructions.view")}</li>
                                <li>${r("qr.modal.instructions.update")}: ${r("qr.modal.status_flow")}</li>
                                <li>${r("qr.modal.instructions.create")}</li>
                            </ol>
                        </div>
                        
                        <div class="footer">
                            <p>${r("qr.modal.footer.generated")} ${new Date().toLocaleDateString(d==="es"?"es-CO":"en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
                            <p>${r("qr.modal.footer.system")}</p>
                        </div>
                    </div>
                </body>
            </html>
        `),s.document.close(),s.focus(),setTimeout(()=>{s.print(),s.close()},1e3))};return t.jsxs(I,{open:e,onClose:o,maxWidth:"md",fullWidth:!0,PaperProps:{sx:{borderRadius:3,background:"linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)"}},children:[t.jsx(_,{sx:{pb:1},children:t.jsxs(l,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[t.jsxs(l,{display:"flex",alignItems:"center",gap:2,children:[t.jsx(l,{sx:{width:40,height:40,borderRadius:2,background:"linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",display:"flex",alignItems:"center",justifyContent:"center"},children:t.jsx(j,{sx:{color:"white",fontSize:24}})}),t.jsxs(l,{children:[t.jsxs(a,{variant:"h6",sx:{fontWeight:"bold",color:"#1a202c"},children:[r("qr.modal.title")," - ",i.instrument]}),t.jsxs(a,{variant:"body2",sx:{color:"#718096"},children:[i.brand," ",i.model," -"," ",i.int_code]})]})]}),t.jsx(A,{onClick:o,size:"small",children:t.jsx(y,{})})]})}),t.jsx(S,{sx:{pb:2},children:t.jsxs("div",{ref:n,children:[t.jsxs(v,{elevation:3,sx:{p:4,textAlign:"center",background:"linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",border:"2px dashed #e2e8f0",borderRadius:3,mb:3},children:[t.jsx(a,{variant:"h6",sx:{mb:2,color:"#3b82f6",fontWeight:"bold"},children:r("qr.modal.scan_title")}),t.jsx(l,{sx:{display:"inline-block",p:2,background:"white",borderRadius:2,boxShadow:"0 4px 12px rgba(0,0,0,0.1)"},children:t.jsx("img",{src:c,alt:"QR Code",style:{maxWidth:"300px",height:"auto",display:"block"}})}),t.jsx(a,{variant:"body2",sx:{mt:2,color:"#718096"},children:r("qr.modal.access_description")})]}),t.jsxs(v,{elevation:2,sx:{p:3,borderRadius:2},children:[t.jsx(a,{variant:"h6",sx:{mb:2,color:"#2d3748",fontWeight:"bold"},children:r("qr.modal.equipment_info")}),t.jsxs(l,{sx:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2},children:[t.jsxs(l,{children:[t.jsx(a,{variant:"body2",sx:{fontWeight:"bold",color:"#4a5568"},children:r("qr.modal.equipment.instrument")}),t.jsx(a,{variant:"body2",sx:{color:"#2d3748",mb:1},children:i.instrument})]}),t.jsxs(l,{children:[t.jsx(a,{variant:"body2",sx:{fontWeight:"bold",color:"#4a5568"},children:r("qr.modal.equipment.internal_code")}),t.jsx(L,{label:i.int_code,size:"small",sx:{bgcolor:"#3b82f615",color:"#3b82f6",fontWeight:"bold"}})]}),t.jsxs(l,{children:[t.jsx(a,{variant:"body2",sx:{fontWeight:"bold",color:"#4a5568"},children:r("qr.modal.equipment.brand")}),t.jsx(a,{variant:"body2",sx:{color:"#2d3748",mb:1},children:i.brand})]}),t.jsxs(l,{children:[t.jsx(a,{variant:"body2",sx:{fontWeight:"bold",color:"#4a5568"},children:r("qr.modal.equipment.model")}),t.jsx(a,{variant:"body2",sx:{color:"#2d3748",mb:1},children:i.model})]})]}),t.jsx(g,{sx:{my:2}}),t.jsxs(l,{sx:{bgcolor:"#ebf8ff",p:2,borderRadius:2,borderLeft:"4px solid #3b82f6"},children:[t.jsx(a,{variant:"body2",sx:{fontWeight:"bold",color:"#2b6cb0",mb:1},children:r("qr.modal.instructions.title")}),t.jsxs(a,{variant:"body2",sx:{color:"#4a5568",lineHeight:1.6},children:["• ",r("qr.modal.instructions.scan"),t.jsx("br",{}),"• ",r("qr.modal.instructions.access"),t.jsx("br",{}),"• ",r("qr.modal.instructions.view"),t.jsx("br",{}),"• ",r("qr.modal.instructions.update"),t.jsx("br",{}),"• ",r("qr.modal.instructions.create")]})]})]})]})}),t.jsxs(B,{sx:{p:3,gap:1},children:[x&&t.jsx(h,{variant:"outlined",startIcon:t.jsx(j,{}),onClick:()=>x(i),sx:{borderColor:"#8b5cf6",color:"#8b5cf6","&:hover":{borderColor:"#7c3aed",backgroundColor:"#8b5cf615"}},children:r("qr.modal.buttons.manage_tasks")}),t.jsx(h,{variant:"outlined",startIcon:t.jsx(M,{}),onClick:p,sx:{borderColor:"#10b981",color:"#10b981","&:hover":{borderColor:"#059669",backgroundColor:"#10b98115"}},children:r("qr.modal.buttons.download")}),t.jsx(h,{variant:"outlined",startIcon:t.jsx(Q,{}),onClick:m,sx:{borderColor:"#f59e0b",color:"#f59e0b","&:hover":{borderColor:"#d97706",backgroundColor:"#f59e0b15"}},children:r("qr.modal.buttons.print")}),t.jsx(h,{variant:"outlined",startIcon:t.jsx(y,{}),onClick:o,sx:{borderRadius:"25px",px:5,py:1.2,textTransform:"uppercase",borderColor:"#1976D2",color:"#1976D2",fontWeight:600,fontSize:"0.875rem",letterSpacing:"0.5px","&:hover":{borderColor:"#1976D2",backgroundColor:"rgba(25, 118, 210, 0.04)"}},children:r("qr.modal.buttons.cancel")})]})]})};export{ot as default};
