export default function Text() {
  return (
    <div className="max-w-3xl px-2 py-2 font-sans text-gray-900">
      <h1 className="text-4xl font-bold text-navy-900 leading-tight mb-6" style={{ color: '#0d1f3c' }}>
        Create Your Resume — Fast and Easy
      </h1>

      <h2 className="text-2xl font-bold mb-4" style={{ color: '#0d1f3c' }}>
        How to find the right resume builder for you?
      </h2>

      <p className="text-xl leading-relaxed mb-6">
        Choosing the right resume builder can make the process much easier and more efficient. 
        With well-designed templates and helpful tools, you can create a resume that stands out
        and improves your chances of landing interviews for the roles you’re targeting.
      </p>

      <p className="text-xl leading-relaxed mb-6">
        To create your resume, simply follow each of the steps below:
      </p>

      <ol className="flex flex-col font-semibold gap-6 mb-6 mt-5 list-none p-0">
        {[
          "Choose the job vacancy you want to work with. Paste its content to get started.",
          "Fill in each section with your details, including your education, experience, skills, and languages.",
          "Download your resume as a PDF file.",
          "Start applying for positions. Your resume is ready to use.",
        ].map((text, i) => (
        <li key={i} className="flex items-start gap-3">
            <span
                className="flex items-center justify-center min-w-[32px] h-8 rounded font-semibold"
                style={{ background: '#5FAE66', color: '#FFFFFF', lineHeight: '1' }}
            >
                {i + 1}
            </span>
            <span className="text-lg leading-relaxed pt-1">{text}</span>
        </li>
        ))}
      </ol>

      <p className="text-lg leading-relaxed mb-4">
        After creating your resume,{' '}
        <strong className="font-semibold text-lg">you can manually edit any section at any time if needed.</strong>{' '}
        You have full control to adjust and customize everything yourself.
      </p>

      <p className="text-lg leading-relaxed">
        Even the best services cannot guarantee success. 
        That’s why it’s important to carefully review and adjust your 
        resume before applying.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#0d1f3c' }}>
        How do you choose a job vacancy to work with?
      </h2>

        <p className="text-xl leading-relaxed mb-6">
        You can select a job vacancy from any platform or job board you prefer, 
        whether it’s a well-known site or a company’s official career page. 
        Once you find a position that matches your interests, simply copy its 
        description and paste it into the tool.
      </p>
        <p className="text-xl leading-relaxed mb-6">
        This allows you to tailor your resume based on real job requirements,
        making it more relevant and aligned with what employers are 
        looking for.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#0d1f3c' }}>
        What information do you need to fill in your resume?
      </h2>

        <p className="text-xl leading-relaxed mb-6">
        Fill in each section of your resume with your personal details, including
        your education, work experience, skills, and languages. This information
        is used only to generate and structure your resume content in a clear and
        professional format, helping you present your background in the best
        possible way.
      </p>
       <p className="text-xl leading-relaxed mb-6">
        All data you provide is used solely for resume creation and is not stored 
        or used for any other purpose, ensuring your privacy and security throughout 
        the process.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#0d1f3c' }}>
        How can you download and use your resume?
      </h2>

        <p className="text-xl leading-relaxed mb-6">
        Once your resume is ready, you can easily download it as a PDF file
        for quick sharing and job applications. This format is widely accepted
        by employers and ensures your document looks clean and professional on any device. 
        If you need to make changes later, you can simply regenerate your resume in the tool 
        or edit the PDF using any standard PDF editor, giving you full flexibility to keep it up to date.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: '#0d1f3c' }}>
        Tips to improve your CV
      </h2>

        <p className="text-xl leading-relaxed mb-6">
        A strong CV is clear, relevant, and tailored to the job you’re applying for. 
        Focus on highlighting your most important strengths and presenting your experience
        in a structured way.
      </p>

      <ul className="flex flex-col gap-3 list-none p-0">
        {[
            "Keep your CV clear and easy to read",
            "Highlight only relevant experience and skills",
            "Use simple, professional formatting",
            "Tailor your CV for each job application",
            "Avoid unnecessary or outdated information",
        ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-lg font-semibold">
            <span className="w-3 h-3 min-w-[8px] bg-[#5FAE66] rounded-b-xs" />
            {item}
            </li>
        ))}
        </ul>

        <p className="text-xl leading-relaxed mt-6 mb-6">
        Always review your CV before sending it. Small improvements in wording and structure
        can significantly increase your chances of getting noticed by employers.
      </p>
    </div>
  );
}