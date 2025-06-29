import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, X, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
}

const Upload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSample, setShowSample] = useState(false);

  const sampleReport = `Medical Case Report
Patient ID: 345678
Name: Michael Johnson
Age: 29
Gender: Male
Date of Report: 2024-09-04

Chief Complaint:
The patient reports experiencing sudden episodes of intense chest pain, heart palpitations, shortness of breath, dizziness, and sweating over the past three months. These episodes typically last for about 10-20 minutes and occur without warning, usually once or twice a week. The patient describes a feeling of impending doom during these episodes and fears having a heart attack.

Medical History:
Family History: No known history of heart disease. Mother has generalized anxiety disorder; father has no significant medical history.
Personal Medical History:
- Anxiety: Diagnosed at age 25; managed with cognitive behavioral therapy (CBT) and occasional use of benzodiazepines.
- Gastroesophageal Reflux Disease (GERD): Diagnosed at age 27; managed with proton pump inhibitors (PPIs) and dietary changes.
- Lifestyle Factors: The patient works in a high-stress job as an investment banker, reports occasional use of caffeine and alcohol, and exercises irregularly.
- Medications: Lorazepam (0.5 mg as needed for anxiety), Omeprazole (20 mg daily).

Recent Lab and Diagnostic Results:
- Electrocardiogram (ECG): Normal sinus rhythm; no signs of ischemia or arrhythmia detected.
- Blood Tests: Cardiac enzymes (troponin, CK-MB) within normal limits; thyroid function tests normal.
- Holter Monitor (24-hour monitoring): No significant arrhythmias; occasional premature ventricular contractions (PVCs) noted.
- Echocardiogram: Normal cardiac structure and function; ejection fraction 60%.

Physical Examination Findings:
- Vital Signs: Blood pressure 122/78 mmHg, heart rate 82 bpm, BMI 23.4.
- Cardiovascular Exam: Normal heart sounds; no murmurs, gallops, or rubs.
- Respiratory Exam: Clear breath sounds; no wheezing or crackles.`;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    fileList.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported. Please upload PDF, TXT, or DOC files.`);
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload process
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, status: 'success' } : f
        ));
      }, 2000);
    });
  };

  const loadSampleReport = () => {
    const sampleFile: UploadedFile = {
      id: 'sample-report',
      name: 'Medical Report - Michael Johnson - Panic Attack Disorder.txt',
      size: new Blob([sampleReport]).size,
      type: 'text/plain',
      status: 'success'
    };

    setFiles(prev => {
      // Remove existing sample if present
      const filtered = prev.filter(f => f.id !== 'sample-report');
      return [...filtered, sampleFile];
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const startAnalysis = () => {
    const successfulFiles = files.filter(f => f.status === 'success');
    if (successfulFiles.length === 0) {
      alert('Please upload at least one medical report before starting analysis.');
      return;
    }
    
    // Scroll to demo section to show analysis
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="upload" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Upload Medical Report
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Securely upload your medical reports to begin AI-powered diagnostic analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-gradient rounded-2xl p-8"
          >
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-white/50 bg-white/5' 
                  : 'border-white/20 hover:border-white/30 hover:bg-white/2'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-white">
                Drop your medical reports here
              </h3>
              <p className="text-gray-400 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 cursor-pointer inline-block hover-lift mr-4"
              >
                Browse Files
              </label>
              <button
                onClick={loadSampleReport}
                className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover-lift border border-white/20"
              >
                Load Sample Report
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, TXT, DOC, DOCX (Max 10MB each)
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Uploaded Files</h4>
                <div className="space-y-3">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-6 w-6 text-blue-400" />
                        <div>
                          <p className="font-medium text-white text-sm">{file.name}</p>
                          <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {file.status === 'uploading' && (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        )}
                        {file.status === 'success' && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {file.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {files.some(f => f.status === 'success') && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <button
                      onClick={startAnalysis}
                      className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover-lift"
                    >
                      Start AI Analysis
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Sample Report Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-gradient rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Sample Medical Report</h3>
              <button
                onClick={() => setShowSample(!showSample)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showSample ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                <span className="text-sm">{showSample ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            {showSample ? (
              <div className="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {sampleReport}
                </pre>
              </div>
            ) : (
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">
                  Click "Show" to view a sample medical report that demonstrates our AI analysis capabilities.
                </p>
                <p className="text-sm text-gray-500">
                  This report contains symptoms of chest pain, palpitations, and anxiety-related episodes.
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">What our AI will analyze:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Cardiovascular symptoms and test results</li>
                <li>• Psychological factors and anxiety patterns</li>
                <li>• Respiratory symptoms and breathing issues</li>
                <li>• Cross-specialty correlations and interactions</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Secure Upload</h4>
            <p className="text-sm text-gray-400">
              All files are encrypted and processed securely with HIPAA compliance
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <UploadIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Multiple Formats</h4>
            <p className="text-sm text-gray-400">
              Support for PDF, Word documents, and plain text medical reports
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Instant Processing</h4>
            <p className="text-sm text-gray-400">
              AI agents begin analysis immediately after successful upload
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Upload;