import{c as a}from"./index-DXApPVQu.js";import{a as t}from"./api-Bsu87Kcu.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=a("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),o={getAll:()=>t.get("/attendance"),getById:e=>t.get(`/attendance/${e}`),checkIn:e=>t.post(`/attendance/check-in/${e}`),checkOut:e=>t.put(`/attendance/check-out/${e}`),create:e=>t.post("/attendance",e),delete:e=>t.delete(`/attendance/${e}`)};export{d as C,o as a};
