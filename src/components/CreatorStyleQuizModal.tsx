import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react';
import { STYLE_QUIZ_QUESTIONS, QUIZ_RESULTS, PRODUCTS } from '../data/products';
import { Product, QuizResult } from '../types';

interface CreatorStyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  onSaveArchetype: (archetypeKey: string) => void;
}

export const CreatorStyleQuizModal: React.FC<CreatorStyleQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  onSaveArchetype,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  if (!isOpen) return null;

  const currentQuestion = STYLE_QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (archetype: string) => {
    const updated = [...selectedAnswers, archetype];
    setSelectedAnswers(updated);

    if (currentStep < STYLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate archetype based on frequency
      const counts: Record<string, number> = {};
      updated.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });
      let highestKey = 'systems-architect';
      let highestCount = 0;
      Object.entries(counts).forEach(([k, count]) => {
        if (count > highestCount) {
          highestCount = count;
          highestKey = k;
        }
      });

      const determinedResult = QUIZ_RESULTS[highestKey] || QUIZ_RESULTS['systems-architect'];
      setResult(determinedResult);
      setQuizFinished(true);
      onSaveArchetype(highestKey);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl bg-[#10121a] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-[#141824] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#4285F4]/20 text-[#4285F4]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">Creator Style Quiz</h3>
              <p className="text-[11px] text-slate-400">Discover your creator silhouette & personalized recommendations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Question {currentStep + 1} of {STYLE_QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / STYLE_QUIZ_QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#4285F4] to-[#34A853] transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / STYLE_QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xl text-white">
                  {currentQuestion.question}
                </h4>
                <p className="text-xs text-slate-400">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.archetype)}
                    className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#4285F4]/50 transition-all text-left group space-y-1"
                  >
                    <div className="font-bold text-sm text-white group-hover:text-[#4285F4] transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                      {opt.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Quiz Result
            <div className="space-y-6 text-center">
              {result && (
                <>
                  <div className="inline-block p-4 rounded-3xl bg-white/5 border border-white/10 space-y-2 max-w-lg mx-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white" style={{ backgroundColor: result.color }}>
                      {result.archetype}
                    </span>
                    <h4 className="font-display font-black text-2xl text-white mt-2">
                      {result.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Personalized Recommended Products */}
                  <div className="text-left space-y-3 pt-2">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Your Tailored Product Matches</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {result.recommendedProductIds.map((id) => {
                        const prod = PRODUCTS.find((p) => p.id === id);
                        if (!prod) return null;
                        return (
                          <div
                            key={prod.id}
                            className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
                          >
                            <div
                              onClick={() => {
                                onSelectProduct(prod);
                                onClose();
                              }}
                              className="cursor-pointer space-y-2"
                            >
                              <img
                                src={prod.images[0]}
                                alt={prod.name}
                                className="w-full aspect-square object-cover rounded-xl"
                              />
                              <div>
                                <div className="text-xs font-bold text-white line-clamp-1">{prod.name}</div>
                                <div className="text-xs font-mono text-[#34A853] font-bold">${prod.price}</div>
                              </div>
                            </div>

                            <button
                              onClick={() => onAddToCart(prod, 1, prod.sizes[0] || 'M', prod.colors[0].name)}
                              className="mt-3 w-full py-1.5 bg-[#4285F4] hover:bg-[#3367d6] text-white text-xs font-medium rounded-xl flex items-center justify-center space-x-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-4">
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white flex items-center space-x-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-white text-black font-semibold text-xs rounded-xl hover:bg-slate-200"
                    >
                      Explore Tailored Store
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
