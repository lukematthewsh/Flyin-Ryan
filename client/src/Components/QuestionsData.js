const data = {
    "questions": [
        //TESTING
        // {
        //     "index": 3,
        //     "folder": "Education",
        //     "inquery": 'What is your highest degree or level of school you have completed?',
        //     "options": ["Less then a High School Diploma", "High School Degree or Equivalent", "Bachelor's Degree (eg. BA, BS)", "Masters Degree (eg. MA, MS, MEd)", "Doctorate (eg. PhD, EdD)", "Other"]
        // },
        // {
        //     "index": 12,
        //     "folder": "Core Value Questions 8",
        //     "inquery": "What are the characteristics you admire most about yourself?",

        // },
        // {
        //     "index": 17,
        //     "folder": "Key Core Values",
        //     "inquery": 'What do you believe your core values to be? There is no "right" number to aim for.',
        // },
        
        // Demographic Questions
        {
            "index": 0,
            "folder": "Age",
            "inquery": 'How old are you?',
            "options": ['0-21', '22-40', '41-65', '65 +'],
            "help":  ""
        }, {
            "index": 1,
            "folder": "Sex",
            "inquery": 'What is your gender?',
            "options": ['Male', 'Female', 'Other', 'Prefer not to say'],
            "help": ""
        }, 
        // Core Value Questions
        {
            "index": 2,
            "folder": "Core Value Questions 1",
            "inquery": 'What does the word "Core" mean to you?',
            "help":  "Others have said: Center, basics, spirit, essential, essence, roots"
        },
        {
            "index": 3,
            "folder": "Core Value Questions 2",
            "inquery": 'What does the word "Value" mean to you?',
            "help":  "Others have said: Principles, standards, philosophy, significance, creed, aspirations"

        },
        {
            "index": 4,
            "folder": "Core Value Questions 3",
            "inquery": 'What does the concept of "Core Values" mean to you?',
            "help":  "Others have said: Rules you live by; personal philosophy; a meaningful and reliable foundation on which decisions are made"

        },
        {
            "index": 5,
            "folder": "Core Value Questions 4",
            "inquery": "Why do you think it is valuable to determine your own core values?",
            "help":  " You may not know right now. One of the reasons we are here is to help you find the answer. Consider the following ideas as possibilities: To establish self-identity and authenticity. To develop a sense of ownership over your behavior and actions. To develop a sense of responsibility for your decision making. To provide a compass for your attitude and decisions in life. To improve your resistance to peer pressure."
        

        },
        {
            "index": 6,
            "folder": "Core Value Questions 5",
            "inquery": "What do you like to do?",
            "help":  "This could be sports, hobbies, areas of study, career goals or other interests. Dig deep!"

        },
        {
            "index": 7,
            "folder": "Core Value Questions 6",
            "inquery": "What are you passionate about?",
            "help":  "This could be one of your activities or it could be something else. Passion is an important agreement in life. If you haven’t found something you are passionate about keep looking for it!"

        },
        {
            "index": 8,
            "folder": "Core Value Questions 7",
            "inquery": "What are the things you like most about yourself?",
            "help":  "These may be personality or character traits, things that make you who you are."

        },
        {
            "index": 9,
            "folder": "Core Value Questions 8",
            "inquery": "When you are feeling at your best, what are the things you notice about yourself?",
            "help":  "It is healthy to focus on what makes you feel good about yourself."

        },
        {
            "index": 10,
            "folder": "Core Value Questions 9",
            "inquery": "What are some things you might want to change about yourself?",
            "help":  "This is an opportunity to be honest with yourself."

        },
        {
            "index": 11,
            "folder": "Core Value Questions 10",
            "inquery": "Think for a moment about a person(s) you deeply respect, what are the characteristics you admire in them?",
            "help":  "This could be a friend, family member, mentor or even someone you haven’t met in person!"

        },
        {
            "index": 12,
            "folder": "Key Core Values",
            "inquery": 'What do you believe your CORE VALUES to be?',
            "help":  "There is no right number to aim for. This is a process, not an exam. Be true to yourself. Think about the characteristics you identified in the person(s) you admire. You should feel free to revisit and revise your Core Values over time. Don’t expect to finish them today."
        }
    ]
}

export default data
