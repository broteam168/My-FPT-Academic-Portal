USE [my-fap]
GO
/****** Object:  Table [dbo].[M_Major]    Script Date: 2/9/2024 2:55:21 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[M_Major](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](100) NOT NULL,
    [Category] [nvarchar](100) NOT NULL,
    [DegreeLevel] [varchar](100) NOT NULL,
    [FullName] [nvarchar](150) NOT NULL,
    [Description] [nvarchar](max) NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [PK_M_Major] PRIMARY KEY CLUSTERED
(
[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[M_SubMajor]    Script Date: 2/9/2024 2:55:21 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[M_SubMajor](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](200) NOT NULL,
    [FullName] [nvarchar](200) NOT NULL,
    [MajorId] [int] NOT NULL,
    [Type] [nvarchar](150) NULL,
    [Description] [nvarchar](max) NOT NULL,
    [IsCommon] [bit] NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [PK_M_SubMajor] PRIMARY KEY CLUSTERED
(
[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[S_Role]    Script Date: 2/9/2024 2:55:21 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[S_Role](
    [id] [int] NOT NULL,
    [name] [nvarchar](50) NOT NULL,
    CONSTRAINT [PK_S_Role] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[S_User]    Script Date: 2/9/2024 2:55:21 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[S_User](
    [UserId] [int] IDENTITY(1,1) NOT NULL,
    [UserName] [varchar](50) NOT NULL,
    [UserPassword] [varchar](max) NOT NULL,
    [Phone] [varchar](50) NULL,
    [Mail] [varchar](50) NULL,
    [Address] [nvarchar](100) NULL,
    [LastLogin] [date] NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [PK_S_User] PRIMARY KEY CLUSTERED
(
[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
    CONSTRAINT [UK_ph4j8u4d8et9etejdr9mig3mr] UNIQUE NONCLUSTERED
(
[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[S_User_Role]    Script Date: 2/9/2024 2:55:21 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[S_User_Role](
    [userid] [int] NOT NULL,
    [roleid] [int] NOT NULL,
    [id] [int] NOT NULL
) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[U_Class]    Script Date: 2/9/2024 2:55:21 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[U_Class](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](max) NOT NULL,
    [MajorId] [int] NOT NULL,
    [Description] [nvarchar](max) NOT NULL,
    [SchoolId] [int] NOT NULL,
    [IsActive] [bit] NOT NULL,
    CONSTRAINT [PK_U_Class] PRIMARY KEY CLUSTERED
(
[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[U_School]    Script Date: 2/9/2024 2:55:21 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[U_School](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](100) NOT NULL,
    [Description] [nvarchar](max) NOT NULL,
    [Location] [nvarchar](100) NOT NULL,
    [Phone] [varchar](100) NULL,
    [IsActive] [bit] NOT NULL,
    [Rule] [nvarchar](max) NULL,
    CONSTRAINT [PK_U_School2] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
