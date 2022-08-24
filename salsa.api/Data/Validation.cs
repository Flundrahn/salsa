using System.ComponentModel.DataAnnotations;
// using CdLib.Data;

namespace salsa.api.Validations
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public sealed class TopicExistsAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var context = validationContext.GetService<DataContext>();
            
            if (value.GetType() != typeof(int))
            {
                return new ValidationResult(ErrorMessage ?? "Topic must be a valid number");
            }

            var topicDay = ((int)value!);

            if (context?.Topics == null)
                return new ValidationResult(ErrorMessage ?? "Topic must exist.");

            return context.Topics!.Any(e => e.Day == topicDay) ? null : new ValidationResult(ErrorMessage ?? "Topic must exist.");
        }
    }
}