﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace LevelUpAPI.Models;

public partial class Graduate
{
    public Guid GraduateId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public int PhoneNumber { get; set; }

    public string EmailAddress { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public int Age { get; set; }

    public DateOnly DateCreated { get; set; }

    public DateOnly? DateEdited { get; set; }

    public bool IsDeleted { get; set; }
}