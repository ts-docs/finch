
#[derive(Debug)]
pub enum FinchError {
    ExpectedFound(char, char),
    Expected(char),
    Unexpected(char),
    MissingPropName,
    InvalidNumber,
    PropNotExist(String),
    TemplateNotExist(String),
    InvalidArg(i32),
    ExpectedObject,
    NotCallable,
    ErrInFunction,
    External(String),
    HelperNotFound(String),
    NotNumbers,
    ExpectedBody(String),
    Custom(String),
    None
}

pub type FinchResult<T> = Result<T, FinchError>;

impl std::fmt::Display for FinchError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::ExpectedFound(expected, found) => write!(f, "Expected character '{}', but found '{}'", expected, found),
            Self::Expected(expected) => write!(f, "Expected character '{}'", expected),
            Self::None => write!(f, "An unknown error occured"),
            Self::Unexpected(unexpected) => write!(f, "Unexpected character '{}'", unexpected),
            Self::InvalidNumber => write!(f, "Could not parse number to a 32-bit floating point"),
            Self::MissingPropName => write!(f, "Expected property name after dot (.)"),
            Self::PropNotExist(prop) => write!(f, "Property '{}' does not exist", prop),
            Self::InvalidArg(n) => write!(f, "Argument {} is invalid", n),
            Self::TemplateNotExist(temp_name) => write!(f, "The template {} doesn't exist", temp_name),
            Self::ExpectedObject => write!(f, "Expected type object for dot notation."),
            Self::NotCallable => write!(f, "Property is not callable."),
            Self::ErrInFunction => write!(f, "An error occured in a JS function"),
            Self::External(text) => write!(f, "{}", text),
            Self::HelperNotFound(helper_name) => write!(f, "Couldn't find helper \"{}\"", helper_name),
            Self::NotNumbers => write!(f, "Cannot use >, <, >=, <= on non-numbers"),
            Self::ExpectedBody(temp) => write!(f, "Expected body for {} helper", temp),
            Self::Custom(st) => write!(f, "{}", st)
        }
    }
}

impl std::error::Error for FinchError {}