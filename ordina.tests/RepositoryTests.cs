using System.Collections.Generic;
using System.Threading.Tasks;
using ordina.api.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ordina.api.Models;
using AutoMapper;
using ordina.api.Models.DTOs;
using ordina.api.Services;
using ordina.api.Data;
using FluentAssertions;

namespace ordina.tests;

public class RepositoryTests
{
    private IRepository _repository;
    private Mock<DateProvider> _dateProvider;
    public RepositoryTests()
    {
        var mappingConfig = new MapperConfiguration(config =>
        {
            config.AddProfile(new Mapper());
        });
        _dateProvider = new Mock<DateProvider>();

        _repository = new Repository(null, mappingConfig.CreateMapper(), _dateProvider.Object);
    }

    public void should_find_course_day()
    {
        _dateProvider.Setup(_dateProvider => _dateProvider.GetCurrentDate())
            .Returns(new DateTime(2022, 5, 6));
        // TODO mock data context
    }
}