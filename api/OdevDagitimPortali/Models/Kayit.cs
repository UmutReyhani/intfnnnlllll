//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OdevDagitimPortali.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Kayit
    {
        public string kayitId { get; set; }
        public string kayitDersId { get; set; }
        public string kayitOgrId { get; set; }
        public string kayitOdevId { get; set; }
    
        public virtual Ders Ders { get; set; }
        public virtual Odev Odev { get; set; }
        public virtual Ogrenci Ogrenci { get; set; }
    }
}
